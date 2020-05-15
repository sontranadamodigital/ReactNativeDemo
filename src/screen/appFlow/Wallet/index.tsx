import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { Wallet } from "./Wallet.view";
import { AppServices } from "../../../services";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
    getWallet: (page: number, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AppServices.getWallet(page).then(res => {
                callback && callback(false, res);
            }).catch(err => {
                console.log("----- getWallet err", err);
                callback && callback(err);
            })
        }
    },
    getWalletByOrder: (id: number, page: number, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AppServices.getWalletByOrder(id, page).then(res => {
                callback && callback(false, res);
            }).catch(err => {
                console.log("----- getWalletByOrder err", err);
                callback && callback(err);
            })
        }
    }
}

let WalletScreen = connect(mapStateToProps, mapDispatchToProp)(Wallet)
export default WalletScreen