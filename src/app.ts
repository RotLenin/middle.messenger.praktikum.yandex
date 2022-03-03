import Router from './class/Router';
import Stash from './class/Stash';
import Modal from './class/Modal';
import Auth from './class/Auth';

Stash.getInstance().init();
Auth.getInstance();
Router.getInstance().init()
Router.getInstance().findRoute();
Modal.getInstance().init();
