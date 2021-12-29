using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Metis.Models
{
    public class Email
    {
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _smptUsername;
        private readonly string _smptPassword;
        private readonly string _senderEmail;
        private readonly bool _enableSsl;
        public Email(string smtpServer, int smtpPort, bool enableSsl, string smptUsername, string smptPassword, string senderEmail)
        {
            _smtpServer = smtpServer;
            _smtpPort = smtpPort;
            _enableSsl = enableSsl;
            _smptUsername = smptUsername;
            _smptPassword = smptPassword;
            _senderEmail = senderEmail;
        }
        public void Send(string[] recipients, string body, string subject, bool isBodyHtml = false, MailPriority priority = MailPriority.Normal)
        {
            if (recipients == null || recipients.Length == 0)
            {
                throw new ArgumentException("Missing recipients");
            }

            SmtpClient client = new SmtpClient(_smtpServer)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_smptUsername, _smptPassword),
                Port = _smtpPort,
                EnableSsl = _enableSsl
            };

            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(_senderEmail);
            for (int i = 0; i < recipients.Length; i++)
            {
                mailMessage.To.Add(recipients[i]);
            }         
            mailMessage.Body = body;
            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = isBodyHtml;
            mailMessage.Priority = priority;
            client.Send(mailMessage);
        }
    }
}
