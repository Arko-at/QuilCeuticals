import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface CartRecoveryProps {
  items: Array<{ title: string; quantity: number; price: number }>;
}

export const CartRecovery = ({ items }: CartRecoveryProps) => (
  <Html>
    <Head />
    <Preview>Did you forget something? Complete your QuilCeuticals order.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logoText}>QUILCEUTICALS</Text>
        </Section>
        <Section style={content}>
          <Text style={greeting}>Hello,</Text>
          <Text style={paragraph}>
            We noticed you left some items in your cart. Our formulations are crafted in small batches and inventory moves quickly.
          </Text>
          <Hr style={divider} />
          <Heading style={heading}>Your Reserved Items</Heading>
          {items.map((item, index) => (
            <Text key={index} style={itemText}>
              • {item.title} (x{item.quantity})
            </Text>
          ))}
          <Hr style={divider} />
          <Text style={paragraph}>
            Click the link below to return to your cart and complete your purchase securely.
          </Text>
          <a href="https://quilceuticals.com/checkout" style={button}>
            Return to Checkout
          </a>
          <Text style={footer}>
            The SKIN INSURED ™ Standard.<br />
            Just Your Skin™.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f6f6',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};
const header = {
  padding: '24px',
  textAlign: 'center' as const,
  backgroundColor: '#0a0a0a',
};
const logoText = {
  color: '#ffffff',
  fontSize: '14px',
  letterSpacing: '0.2em',
  margin: '0',
  fontWeight: 'bold',
};
const content = {
  padding: '24px',
};
const greeting = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#333',
};
const paragraph = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#555',
};
const heading = {
  fontSize: '14px',
  fontWeight: 'bold',
  letterSpacing: '0.05em',
  textTransform: 'uppercase' as const,
  color: '#111',
};
const itemText = {
  fontSize: '14px',
  color: '#333',
  margin: '4px 0',
};
const divider = {
  borderColor: '#e6e6e6',
  margin: '24px 0',
};
const button = {
  backgroundColor: '#0a0a0a',
  color: '#ffffff',
  display: 'inline-block',
  padding: '12px 24px',
  textDecoration: 'none',
  fontSize: '12px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  marginTop: '16px',
};
const footer = {
  fontSize: '12px',
  color: '#888',
  marginTop: '32px',
  textAlign: 'center' as const,
};
