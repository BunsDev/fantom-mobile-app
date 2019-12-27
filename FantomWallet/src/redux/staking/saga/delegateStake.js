// @flow
import { takeLatest, put, select, call } from "redux-saga/effects";
import {
  types,
  delegateByAddressesSuccess,
  delegateByAddressesFailure
} from "../actions";
import { setDopdownAlert } from "~/redux/notification/actions";
import { getDataWithQueryString } from "../../../common/api";
import { GET_BALANCE_API } from "react-native-dotenv";
import axios from "axios";
import Web3Agent from "~/services/api/web3";

type Action = {
  payload: {
    mnemonic: string,
    cb: (publicKey: string) => void
  }
};

export function* delegateByAddressSaga({
  payload: { publicKey }
}: Action): any {
  try {
    const response = yield call(
      getDataWithQueryString("delegatorByAddress", publicKey)
    );
  } catch (e) {
    yield put(setDopdownAlert("error", e.message));
  }
}

const delegatorByAddressApi = async publicKey => {
  return getDataWithQueryString("delegatorByAddress", `${publicKey}`);
};

export function* delegateByAddressesSaga(): any {
  const { walletsData } = yield select(({ keys, wallet }) => ({
    keys,
    walletsData: wallet.walletsData
  }));
  if (walletsData && walletsData.length > 0) {
    for (let i = 0; i < walletsData.length; i++) {
      const wallet = walletsData[i];
      const { publicKey } = wallet;
      if (publicKey) {
        try {
          const response = yield call(delegatorByAddressApi, publicKey);
          yield put(delegateByAddressesFailure({ publicKey, response }));
        } catch (exception) {
          yield put(delegateByAddressesFailure({ publicKey }));
        }
      }
    }
  }
}

export function* delegateByStakerIdSaga({
  payload: { stakerId }
}: Action): any {
  try {
    const response = yield call(
      getDataWithQueryString("delegatorByStakerId", stakerId)
    );
  } catch (e) {
    yield put(setDopdownAlert("error", e.message));
  }
}

export function* delegateAmountSaga({
  payload: { amount, publicKey }
}: Action): any {
  try {
    const response = yield Web3Agent.Fantom.delegateStake({
      amount,
      publicKey
    });
    // Assign contract functions to sfc variable
  } catch (e) {
    yield put(setDopdownAlert("error", e.message));
  }
}

export default function* listener(): Iterable<any> {
  yield takeLatest(types.DELEGATE_BY_ADDRESS, delegateByAddressSaga);
  yield takeLatest(types.DELEGATE_BY_ADDRESSES, delegateByAddressesSaga);
  yield takeLatest(types.DELEGATE_BY_STAKER_ID, delegateByStakerIdSaga);
  yield takeLatest(types.DELEGATE_AMOUNT, delegateAmountSaga);
}