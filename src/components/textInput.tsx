import React,{ PureComponent } from "react";
import { TextInput, StyleSheet } from "react-native";

type Props = {

}


type State = {
    value:string,
}


class TextInputCustom extends PureComponent<Props,State> {
    constructor(props) {
        super(props)
        this.state = {
            'value': "2222"
        }
    }
    handleChange = (value)=> {
        this.setState({
                "value" : value
            }) 
    }
    render() {
        return (
            <>
                <TextInput style={styles.text} value={this.state.value} onChange={this.handleChange} />
            </>
        )
    }

}
const styles = StyleSheet.create({
    text:{
        color: "red"
    }

})

export default TextInputCustom;