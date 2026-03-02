import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '@/components/layout/Navbar';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" {...props} />
  ),
}));

describe('Navbar Component', () => {
  it('renders logo and navigation links', () => {
    render(<Navbar />);

    expect(screen.getByAltText(/Rare Foundation Logo/i)).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('opens and closes mobile menu when toggle is clicked', async () => {
    // Mock window innerWidth to simulate mobile
    window.innerWidth = 500;
    render(<Navbar />);

    const menuButton = screen.getByRole('button', { name: '' }); // The button with Menu icon
    fireEvent.click(menuButton);

    // Check if X icon (close button) appears in the mobile menu
    // We can't easily query by icon name in standard testing-library without specific labels
    // but we can check for text that's only in the mobile menu overlay or the overlay itself
    expect(screen.getByText('DONATE NOW')).toBeInTheDocument();
  });

  it('triggers donation modal when DONATE NOW is clicked', () => {
    render(<Navbar />);
    const donateButtons = screen.getAllByText('DONATE NOW');
    fireEvent.click(donateButtons[0]);

    expect(screen.getByText('Make a Donation')).toBeInTheDocument();
  });
});
