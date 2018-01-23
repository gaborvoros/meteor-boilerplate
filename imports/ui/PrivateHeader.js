import React from 'react'
import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'

// needs to be a variable as we use propTypes
const PrivateHeader = (props) => {
	return (
			<div className="private-header">
				<div className="private-header__content">
					<h1 className="private-header__title">{props.title}</h1>
					<button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
				</div>
			</div>
	)
}
PrivateHeader.propTypes = {
	title: React.PropTypes.string.isRequired
}

export default PrivateHeader
