import {Meteor} from 'meteor/meteor'
import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import Login from '../ui/Login'
import Signup from '../ui/Signup'
import Dashboard from '../ui/Dashboard'
import NotFound from '../ui/NotFound'

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/dashboard']

//prohibit backbutton to get to public pages if user is logged in
const onEnterPublicPage = () => {
	if (Meteor.userId()){
		//using replace instead of push as the backbutton is broken
		browserHistory.replace('/dashboard')
	}
}
//prohibit backbutton to get to private pages if user is not logged in
const onEnterPrivatePage = () => {
	if (!Meteor.userId()){
		browserHistory.replace('/')
	}
}
export const onAuthChange = (isAuthenticated) => {
	const pathName = browserHistory.getCurrentLocation().pathname

	const isUnauthenticatedPage = unauthenticatedPages.includes(pathName)
	const isAuthenticatedPage = authenticatedPages.includes(pathName)

	if(isUnauthenticatedPage && isAuthenticated){
		browserHistory.replace('/dashboard')
	}else if(isAuthenticatedPage && !isAuthenticated){
		browserHistory.replace('/')
	}
}

export const routes = (
		<Router history={browserHistory}>
			<Route path="/" component={Login} onEnter={onEnterPublicPage}/>
			<Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
			<Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
			<Route path="*" component={NotFound} onEnter={onEnterPrivatePage}/>
		</Router>
)