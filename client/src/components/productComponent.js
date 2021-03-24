import React, {useEffect} from 'react';
import {ScrollView, Text, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ActionTypes, fetchProductDetails, fetchProducts} from '../redux/actions';
import LoadingComponent from "./loadingComponent";
import {DEFAULT_VIEW_STYLE} from '../utils/utils'



const ProductComponent = (props) => {

    useEffect(() => {
        const productId = props.route.params.productId;
        props.navigation.setOptions({title: `Product ${productId}`});
        props.fetchProductDetails(productId);
    }, []);

    return(
        <ScrollView contentContainerStyle={styles.productDetailsView}>

            <Image source={{ uri: props.product.image}} style={styles.image} resizeMode={'contain'}/>

            <Text style={styles.productName}>{props.product.name}</Text>

            <Text>{props.product.description}</Text>

            <Text>Price: ${props.product.price}</Text>

            <LoadingComponent isLoading={props.isLoading}/>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    productName : {margin : 10, fontSize: 20, fontWeight : 'bold'},
    image : {height: 200, width: '80%'},
    productDetailsView : {alignItems: 'center'}

});



const mapDispatchToProps = (dispatch) => ({
    fetchProductDetails: (productId) => fetchProductDetails(productId, dispatch)
});

const mapStateToProps = (state) => ({
    product: state.product.data,
    isLoading: state.product.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
