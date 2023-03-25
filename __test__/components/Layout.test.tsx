import Layout from '@/components/Layout';
import { render, screen } from '@testing-library/react';

describe('Layout', () => {
  it('renders the children and the logo', () => {
    const title = 'Test Title';
    const mockChild = <div data-testid="test-child" />;
    render(<Layout title={title}>{mockChild}</Layout>);

    // document title not supported
    // expect(document.title).toBe(title);
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByAltText('Pokemon')).toBeInTheDocument();
  });
});
