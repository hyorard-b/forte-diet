/* eslint-disable indent */
import firebase from 'firebase';

const {
  REACT_APP_FB_API_KEY,
  REACT_APP_FB_AUTH_DOMAIN,
  REACT_APP_FB_PROJECT_ID,
  REACT_APP_FB_STORAGE_BUCKET,
  REACT_APP_FB_MESSAGE_ID,
  REACT_APP_FB_APP_ID
} = process.env;

export const config = {
  apiKey: REACT_APP_FB_API_KEY,
  authDomain: REACT_APP_FB_AUTH_DOMAIN,
  projectId: REACT_APP_FB_PROJECT_ID,
  storageBucket: REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FB_MESSAGE_ID,
  appId: REACT_APP_FB_APP_ID
};

/* firebase 초기화 */
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/* 언어 설정 */
auth.languageCode = 'ko';

/* Google Auth Provider 설정 */
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/* -------------------------------------------------------------------------- */
/*                                     로그인                                    */
/* -------------------------------------------------------------------------- */

/* 구글 로그인 (thunk) */
const signInWithGoogle = signInAction => auth.signInWithPopup(googleProvider);

export const handleSignInGoogleAuthProvider = (closeDialog, signInAction) => async dispatch => {
  try {
    const {
      additionalUserInfo: { profile },
      user
    } = await signInWithGoogle();

    const currentUser = {
      uid: user.uid,
      email: profile.email,
      displayName: profile.name,
      photoURL: profile.picture
    };

    dispatch(signInAction(currentUser));
    closeDialog();
  } catch (e) {
    console.error(e);
  }
};

/* 로컬 로그인 (thunk) */
export const handleSignInWithEmailAndPassword = (
  email,
  password
  // signInAction
) => async dispatch => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* 로그아웃 함수 */
const authSignOut = () => auth.signOut();

export const handleSignOut = signOutAction => async dispatch => {
  try {
    await authSignOut();
    dispatch(signOutAction());

    return true;
  } catch (e) {
    console.error(e);
  }
};

/* 회원가입 함수 */
export const createOrGetAuthUser = async (user, additionalData = {}) => {
  // 사용자 정보가 전달되지 않으면 오류
  if (!user) {
    throw new Error('createOrGetAuthUser 유틸리티는 user 값 입력이 필요합니다.');
  }

  // 인증 사용자 문서 참조 생성
  const userRef = firestore.doc(`users/${user.uid}`);
  // 인증 사용자 문서 스냅샷 가져오기 (비동기 요청/응답)
  const snapshot = await userRef.get();

  // 스냅샷이 없을 경우
  if (!snapshot.exists) {
    try {
      // 인증 사용자 정보 추출
      const { uid, displayName, email, photoURL } = user;
      // 생성일자 생성
      const createdAt = new Date();

      // 데이터베이스에 인증 사용자 데이터 쓰기
      await userRef.set({
        uid,
        displayName,
        email,
        photoURL,
        createdAt,
        like: [],
        // 추가 데이터가 전달된 경우 병합(믹스인)
        ...additionalData
      });
    } catch (error) {
      throw new Error(error.mesage);
    }
  }

  // 인증 사용자 문서 참조 객체 반환
  return userRef;
};

export const signUpWithEmailAndPassword = async (email, password, additionalData = {}) => {
  try {
    // 사용자가 입력한 이메일, 패스워드를 전달해 인증 (비동기 요청/응답)
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    // 인증 사용자 문서 생성 또는 가져오기 유틸리티를 사용해 인증 사용자 문서 참조 반환
    // 닉네임, 성, 키, 몸무게 등의 추가 정보 저장
    await createOrGetAuthUser(user, additionalData);

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

/* 로그인 상태 유지 설정 */
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

export const setAuthPersist = value => {
  let mode = '';
  switch (value) {
    default:
    case 'local':
      mode = 'LOCAL';
      break;
    case 'session':
      mode = 'SESSION';
      break;
    case 'none':
      mode = 'NONE';
  }

  auth.setPersistence(firebase.auth.Auth.Persistence[mode]);
};

/* 좋아요 추가 함수 */
export const addLikeToUser = async (user, newLike, dietData, newLikeNum) => {
  // 사용자 정보가 전달되지 않으면 오류
  if (!user) {
    throw new Error('createOrGetAuthUser 유틸리티는 user 값 입력이 필요합니다.');
  }

  // 인증 사용자 문서 참조 생성
  try {
    const userRef = firestore.doc(`users/${user.uid}`);
    const dietAuthorRef = firestore.doc(`users/${dietData.uid}`);

    userRef.set(
      {
        like: newLike
      },
      { merge: true }
    );

    dietAuthorRef.set(
      {
        dietList: {
          [dietData.date]: {
            like: newLikeNum
          }
        }
      },
      { merge: true }
    );

    return true;
  } catch (e) {
    throw new Error(e.message);
  }
};
