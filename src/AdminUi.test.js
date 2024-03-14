import { render, screen } from '@testing-library/react';
import AdminUi from './AdminUi';

test('renders learn react link', () => {
  render(<AdminUi />);
  const linkElement = screen.getByText('User Details');
  expect(linkElement).toBeInTheDocument();
});