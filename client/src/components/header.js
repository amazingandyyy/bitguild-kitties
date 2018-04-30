import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const Header = (props) => (
<Menu>
	<Link to='/'>
		<Menu.Item>
			My Kitties
		</Menu.Item>
	</Link>
	<Link to='/gifting'>
		<Menu.Item>
			Gifting History
		</Menu.Item>
	</Link>
</Menu>);

export default Header;