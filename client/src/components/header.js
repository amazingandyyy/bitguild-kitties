import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import web3 from '../utils/web3';

class Header extends React.Component{
	render(){
		return (<Menu>
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
			<Menu.Menu position='right'>
				<a href='https://github.com/amazingandyyy/bitguild-kitties' target='_blank' rel='noopener noreferrer'>
					<Menu.Item>
						Github
					</Menu.Item>
				</a>
				</Menu.Menu>
		</Menu>)
	}
}

export default Header;