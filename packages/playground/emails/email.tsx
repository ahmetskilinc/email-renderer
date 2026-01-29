import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
} from '@react-email/components';

export default function Email() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <Body
        style={{
          backgroundColor: '#f3f4f6',
          margin: 0,
          padding: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: 'none',
            fontSize: '1px',
            color: '#f3f4f6',
            lineHeight: '1px',
            maxHeight: '0px',
            maxWidth: '0px',
            opacity: 0,
            overflow: 'hidden',
          }}
        >
          Test your email rendering across Gmail, Apple Mail, and Outlook
        </div>
        <Container
          style={{
            maxWidth: '600px',
            margin: '40px auto',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Section
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '40px 30px',
              textAlign: 'center',
            }}
          >
            <Heading
              style={{
                margin: 0,
                color: '#ffffff',
                fontSize: '32px',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.5px',
              }}
            >
              Welcome to Email Renderer
            </Heading>
            <Text
              style={{
                margin: '12px 0 0 0',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '16px',
                fontWeight: 400,
              }}
            >
              Test your emails across all major clients
            </Text>
          </Section>
          <Section style={{ padding: '40px 30px', backgroundColor: '#ffffff' }}>
            <Heading
              style={{
                margin: '0 0 16px 0',
                color: '#111827',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              Hello there! 👋
            </Heading>
            <Text
              style={{ margin: '0 0 16px 0', color: '#4b5563', fontSize: '16px', lineHeight: 1.6 }}
            >
              This is a comprehensive email template designed to test rendering across different
              email clients including Gmail, Apple Mail, and Outlook.
            </Text>
            <Text
              style={{ margin: '0 0 24px 0', color: '#4b5563', fontSize: '16px', lineHeight: 1.6 }}
            >
              The template includes modern design elements, responsive layouts, and best practices
              for email compatibility.
            </Text>
            <Section style={{ textAlign: 'center', margin: '24px 0' }}>
              <Button
                href="#"
                style={{
                  backgroundColor: '#667eea',
                  color: '#ffffff',
                  padding: '14px 32px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-block',
                  lineHeight: 1.5,
                }}
              >
                Get Started
              </Button>
            </Section>
            <Hr style={{ borderColor: '#e5e7eb', margin: '32px 0 24px 0' }} />
            <Text
              style={{ margin: '0 0 12px 0', color: '#111827', fontSize: '16px', fontWeight: 600 }}
            >
              Key Features:
            </Text>
            <Text
              style={{
                margin: '0 0 8px 0',
                color: '#4b5563',
                fontSize: '15px',
                lineHeight: 1.8,
                paddingLeft: '20px',
              }}
            >
              • Cross-client compatibility testing
            </Text>
            <Text
              style={{
                margin: '0 0 8px 0',
                color: '#4b5563',
                fontSize: '15px',
                lineHeight: 1.8,
                paddingLeft: '20px',
              }}
            >
              • Real-time rendering preview
            </Text>
            <Text
              style={{
                margin: '0 0 8px 0',
                color: '#4b5563',
                fontSize: '15px',
                lineHeight: 1.8,
                paddingLeft: '20px',
              }}
            >
              • Comprehensive analysis and warnings
            </Text>
            <Text
              style={{
                margin: 0,
                color: '#4b5563',
                fontSize: '15px',
                lineHeight: 1.8,
                paddingLeft: '20px',
              }}
            >
              • React Email component support
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
