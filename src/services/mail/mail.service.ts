import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from './dto/send-mail.dto';
import { google } from 'googleapis'
import { ConfigService } from '@nestjs/config';
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) { }
  
  private async setTransport() {
    const OAuth2 = google.auth.OAuth2
    const oauth2Client = new OAuth2(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get("GOOGLE_CLIENT_SECRET"),
      this.configService.get("GOOGLE_REDIRECT_URI")
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    })

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token")
        }
        resolve(token)
      })
    })

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get("GOOGLE_EMAIL"),
        clientId: this.configService.get("GOOGLE_CLIENT_ID"),
        clientSecret: this.configService.get("GOOGLE_CLIENT_SECRET"),
        accessToken
      }
    }

    this.mailerService.addTransporter('gmail', config)
  }

  public async sendMail(emailData: SendMailDto) {
    try {
      await this.setTransport()
      const { recipient, subject, template_name, data } = emailData
      await this.mailerService.sendMail({
        transporterName: 'gmail',
        from: 'noreply@audiophile.com',
        to: recipient,
        subject,
        template: template_name,
        context: data,
      })
    } catch (error) {
      console.log('Error ->', error)
      return error.message
    }
  }
}
