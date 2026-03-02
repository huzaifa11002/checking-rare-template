import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from '@/components/layout/Footer';

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" {...props} />
  ),
}));

describe('Footer Component', () => {
  it('renders footer links and contact information', () => {
    render(<Footer />);

    expect(screen.getByText(/Quick Links/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    expect(screen.getByText('contact@rarefoundation.com')).toBeInTheDocument();
    expect(screen.getByText('+92 3002119323')).toBeInTheDocument();
  });

  it('contains social media links', () => {
    render(<Footer />);
    const fbLink = screen.getByRole('link', { name: /WA/i }); // One of the links
    expect(fbLink).toBeInTheDocument();
  });
});
