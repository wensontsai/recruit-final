module.exports = {
    'secret': '<secret>',
    'database': {
      'dev': 'mongodb://localhost/<database_name>',
      'test': 'mongodb://localhost/<test_database_name>'
    },
    'email': {
      service: '<for_example_Gmail_or_other_service>',
      auth: {
        host: '<for_gmail_use_:_smtps://user%40gmail.com:pass@smtp.gmail.com>',
        user: '<email_to_send_from',
        pass: '<email_acct_pssword',
        sender_name: '<sender_name>'
      }
    }
};