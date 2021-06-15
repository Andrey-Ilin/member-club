import { render } from '@testing-library/react';

import MembersList from './members-list';

describe('MembersList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MembersList />);
    expect(baseElement).toBeTruthy();
  });
});
