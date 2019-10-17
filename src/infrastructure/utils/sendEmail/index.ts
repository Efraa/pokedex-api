import nodemailer, { Transporter, SendMailOptions } from 'nodemailer'

interface IBuild {
  to: string,
  subject: string,
  html: string
}

export class Email {
  private transporter: Transporter

  constructor (private config: config) {
    this.setTransporter()
  }

  private async setTransporter (): Promise<Transporter>  {
    const { nodemailer : nodemailerConfig } = this.config
    const { auth : nodemailerAuth } = nodemailerConfig
    // Test Account
    const account = await nodemailer.createTestAccount()
    // Create Transport
    this.transporter = nodemailer.createTransport({
      host: nodemailerConfig.host || 'smtp.ethereal.email',
      port: nodemailerConfig.port || 587,
      auth: {
        user: nodemailerAuth.user || account.user,
        pass: nodemailerAuth.pass || account.pass,
      }
    })
    return this.transporter
  }

  public async build({ to, subject, html }: IBuild) {
    const { from } = this.config.nodemailer
    const message: SendMailOptions = {
      from,
      to,
      subject,
      html
    }

    const send = await this.transporter.sendMail(message)
    if (send)
      return `The email has been sent successfully. ${send.messageId}`
  }
}