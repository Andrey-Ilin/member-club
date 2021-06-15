import { render } from '@testing-library/react';

import MembersListItem from './members-list-item';

describe('MembersListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MembersListItem />);
    expect(baseElement).toBeTruthy();
  });
});
