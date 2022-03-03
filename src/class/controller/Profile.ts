import Stash, {STASH_ENUM} from '../Stash';
import Router from '../Router';
import Modal from '../Modal';
import Auth from '../Auth';
import DefaultController from './DefaultController';
import ProfileTemplate from '../view/Profile';
import ProfileImgModal from '../view/modal/ProfileImgModal';
import StaticModel from '../model/StaticModel';

import Ivalidate from '../../types/interface/Ivalidate';
import Iuser from '../../types/interface/Iuser';
import IuserChangePassword from '../../types/interface/IuserChangePassword';

import {logout} from '../../api/auth';
import {changeProfile, changePassword, uploadProfileImg} from '../../api/users';

import {setError} from '../../utils/inputValidation';
import {resourseLink} from '../../utils/resourseLink';

import * as ROUTES from '../../constants/routes';

export enum PROFILE_METHODS {
  PROFILE = 'profile',
  PASSWORD = 'password',
  CHANGE = 'change',
}

/** Profile
 *  Контроллер для шаблона profile
 */
export default class Profile extends DefaultController {
  private static instance: Profile;
  public _template = ProfileTemplate;
  private _imgProfileTemplate = ProfileImgModal;
  private _modalRoot : HTMLElement | null = null;
  private _body: Element;

  /** constructor
   *  Создаем экземпляр Profile
   */
  constructor() {
    super();
    /** Привязываем context */
    this._changeAction = this._changeAction.bind(this);
    this._passwordAction = this._passwordAction.bind(this);
    this._profileImgAction = this._profileImgAction.bind(this);
    this._openProfileImgModal = this._openProfileImgModal.bind(this);
    this._closeProfileImgModal = this._closeProfileImgModal.bind(this);
    this._profileImgSave = this._profileImgSave.bind(this);
    this._profileImgUpload = this._profileImgUpload.bind(this);
  }

  /** getInstance
   *  Получаем/создаем экземпляр singleton
   *  @return {Profile}
   */
  public static getInstance(): Profile {
    if (!Profile.instance) {
      Profile.instance = new Profile();
    }
    return Profile.instance;
  }

  /** profile
   * Получаем данные для шаблона profile, выставляем обработчики
   */
  async profile() {
    const user = Stash.getInstance().getState(STASH_ENUM.USER);
    const locals = await StaticModel.getProfileLocals()
        .then((res : Record<string, any>) => res.default.profile)
    locals.locals.profile = this._setValueFromStash(locals.locals.profile, user);
    locals.locals.avatar = user?.avatar ? resourseLink(user.avatar) : null;
    const profile = await this._renderTemplate(locals)
    if (!this._mountTemplate(profile)) {
      throw new Error('Can\'t mount template');
    }

    this._profileImg();
    this.initSPALinks();
    this._setLogout();

    this.setLastTemplate()
  }

  /** password
   * Получаем данные для шаблона profile, выставляем обработчики
   */
  async password() {
    const user = Stash.getInstance().getState(STASH_ENUM.USER);
    const locals = await StaticModel.getProfileLocals()
        .then((res : Record<string, any>) => res.default.password)
    locals.locals.avatar = user?.avatar ? resourseLink(user.avatar) : null;
    const profile = await this._renderTemplate(locals)

    if (!this._mountTemplate(profile)) {
      throw new Error('Can\'t mount template');
    }

    this._setBody();
    this._setInputValidation(this._body);
    this._setPasswordAction()
    this.initSPALinks();

    this.setLastTemplate()
  }

  /** change
   * Получаем данные для шаблона profile, выставляем обработчики
   */
  async change() {
    const user = Stash.getInstance().getState(STASH_ENUM.USER);
    const locals = await StaticModel.getProfileLocals()
        .then((res : Record<string, any>) => res.default.change)
    locals.locals.profile = this._setValueFromStash(locals.locals.profile, user);
    locals.locals.avatar = user?.avatar ? resourseLink(user.avatar) : null;
    const profile = await this._renderTemplate(locals)

    if (!this._mountTemplate(profile)) {
      throw new Error('Can\'t mount template');
    }

    this._setBody()
    this._setInputValidation(this._body)
    this._setChangeAction()
    this.initSPALinks()

    this.setLastTemplate()
  }

  /** _setBody
   *  Выставляем root элемент для последующего использования
   *  @return {boolean}
   *  @throws {string}
   */
  _setBody() {
    const find = document.querySelector('.profile__form');
    if (find instanceof Element) {
      this._body = find;
      return true;
    }
    throw new Error('Can\'t find .profile_form');
  }

  /** _getAcceptBtn
   *  Ищем кнопку для действия
   *  @param {string} selector
   *  @return {HTMLElement}
   *  @throws {string}
   */
  _getAcceptBtn(selector : string) : HTMLElement {
    const find = this._body.querySelector(selector);
    if (find instanceof HTMLElement) {
      return find;
    }
    throw new Error('can\'t find .accept-btn');
  }

  /** _setChangeAction
   *  @description Выставляем действие на кнопку
   *  @return {boolean}
   *  @throws {string}
   */
  _setChangeAction() {
    if (this._body instanceof HTMLElement) {
      this._getAcceptBtn('.profile-accept-action')
          .addEventListener('click', this._changeAction);
      return true;
    }
    throw new Error('Undefined _body');
  }

  /** _changeAction
   *  @description Действие при сохранении изменений данных пользователя
   *  @throws {string}
   */
  public _changeAction() {
    this._validate(this._body)
        .then(async (res : Ivalidate) => {
          if (res.status) {
            const user = <Iuser> res.data;
            const queryRes = await changeProfile(user);
            if (queryRes.status === 200) {
              Stash.getInstance().setState(STASH_ENUM.USER, res.data);
              Router.getInstance().redirect(ROUTES.PROFILE_ROUTE);
              return true;
            }
            throw new Error('Bad request answer');
          }
        })
        .catch((err) => {
          throw new Error(err)
        });
  }

  /** _setPasswordAction
   *  @description Выставляем действие на кнопку
   *  @return {boolean}
   *  @throws {string}
   */
  _setPasswordAction() {
    if (this._body instanceof HTMLElement) {
      this._getAcceptBtn('.profile-accept-action')
          .addEventListener('click', this._passwordAction);
      return true;
    }
    throw new Error('Undefined _body');
  }

  /** _passwordAction
   *  @description Действие при сохранении изменений пароля
   *  @throws {string}
   */
  _passwordAction() {
    this._validate(this._body)
        .then(async (res : Ivalidate) => {
          if (res.status) {
            const {oldPassword, newPassword, reNewPassword} = res.data;

            if (oldPassword === newPassword) {
              setError(
                <HTMLElement> this._body,
                'reNewPassword',
                'Старый и новый пароль - совпадают !'
              );
            }

            if (newPassword !== reNewPassword) {
              setError(
                <HTMLElement> this._body,
                'reNewPassword',
                'Пароли не совпадают !'
              );
            }
            // если нарушено хотя бы 1 из условий выше - нет смысла отправлять запрос
            if (oldPassword === newPassword || newPassword !== reNewPassword) {
              return true;
            }

            const userChangePassword : IuserChangePassword = {
              oldPassword: oldPassword,
              newPassword: newPassword,
            }

            const queryRes = await changePassword(userChangePassword);
            if (queryRes.status === 200) {
              Router.getInstance().redirect(ROUTES.PROFILE_ROUTE);
              return true;
            }
            throw new Error('Bad request answer');
          }
        })
        .catch((err) => {
          throw new Error(err)
        });
  }

  /** _setValueFromStash
   *  Выставляем значения на значения пользователя
   * @param {Record<string, any>} fields
   * @param {Record<string, any>} user
   * @return {Record<string, any>}
   */
  _setValueFromStash(fields : Record<string, any>, user : Record<string, any>)
    : Record<string, any> {
    return fields.map((el : Record<string, any>) => {
      const name = el.name;
      if (Object.prototype.hasOwnProperty.call(user, name)) {
        el.value = user[name]
      }
      return el;
    });
  }

  /** _setLogout
   *  Вешаем на кнопку выход из аккаунта
   *  @throws {Error}
   */
  _setLogout() {
    const logoutBtn = document.querySelector('#logout');
    if (!logoutBtn) {
      throw new Error('Can\'t find #logout');
    }

    logoutBtn.addEventListener('click', () => logout()
        .then(() => {
          Auth.getInstance().checkout();
        })
        .catch(() => {
          Auth.getInstance().checkout();
        })
    );
  }

  /** _profileImg
   *  @description Вешаем клик на иконку
   *  @throws {Error}
   */
  _profileImg() {
    const imgWrapper = document.querySelector('.profile__wrapper .profile-img .profile-img__img-wrapper');
    if (!imgWrapper) {
      throw new Error('Can\'t find .profile-img__img-wrapper');
    }
    imgWrapper.addEventListener('click', this._profileImgAction);
  }

  /** _profileImgAction
   *  @description Действие при клике на аватарку
   */
  _profileImgAction() {
    Modal.getInstance().setTemplate(
        this._imgProfileTemplate,
        {},
        this._openProfileImgModal,
        this._closeProfileImgModal
    ).show();
  }

  /** _openProfileImgModal
   * @description Открываем модалку по смене аватара
   * @param {HTMLElement} root
   */
  _openProfileImgModal(root : HTMLElement) {
    this._modalRoot = root;

    if (this._modalRoot) {
      const input = this._modalRoot.querySelector('#profileImg');
      const actionBtn = this._modalRoot.querySelector('.accept-btn');
      // const ACTION_ERROR_TEXT = 'Нужно выбрать файл';
      input?.addEventListener('change', this._profileImgUpload);
      actionBtn?.addEventListener('click', this._profileImgSave);
    }
  }

  /** _profileImgUpload
   *  @throws {Error}
   *  @return {boolean}
   */
  _profileImgUpload() {
    if (this._modalRoot === null) {
      throw new Error('Unknow modal root');
    }

    const defaultText = 'Выберите файл на компьютере';
    const input : HTMLInputElement | null = this._modalRoot.querySelector('#profileImg');
    const label : HTMLLabelElement | null = this._modalRoot.querySelector('label[for=profileImg]');
    const modalTitle = this._modalRoot.querySelector('.profile-img-modal__title');
    const actionError = this._modalRoot.querySelector('.profile-img-modal__action-error');

    if (!input || !label || !modalTitle || !actionError) {
      throw new Error('Can\'t find modal Elements');
    }

    /** onUpload
     * @description Процесс загрузки
     * @param {HTMLInputElement} input
     * @param {HTMLLabelElement} label
     * @return {boolean}
     */
    function onUpload(input : HTMLInputElement, label : HTMLLabelElement) {
      if (input.value !== '') {
        label.classList.add('custom-file-uploader_done');
        const text = input.value.split('\\').pop();
        label.innerHTML = text ? text : '';
        return true;
      }
      label.classList.remove('custom-file-uploader_done');
      label.innerHTML = defaultText;
      return false;
    }

    const res = onUpload(input, label);

    if (res) {
      modalTitle.innerHTML = 'Файл загружен';
      actionError.innerHTML = '';
      return true;
    }

    modalTitle.innerHTML = 'Загрузите файл';
    return true;
  }

  /** _profileImgSave
   *  @description Сохраняем аватар
   *  @throws {Error}
   */
  async _profileImgSave() {
    if (this._modalRoot === null) {
      throw new Error('Unknow modal root');
    }
    const input = this._modalRoot.querySelector('#profileImg');
    if (!input) {
      throw new Error('Can\'t find input');
    }
    // @ts-ignore
    const uploadRes = await uploadProfileImg({avatar: input.files[0]});

    if (uploadRes.status === 200) {
      Stash.getInstance().setState(STASH_ENUM.USER, JSON.parse(uploadRes.response))
    }
  }

  /** _closeProfileImgModal
   * @param {HTMLElement} root
   */
  _closeProfileImgModal() {}
}
