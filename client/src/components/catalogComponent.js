import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import {ActionTypes, fetchProducts, searchProduct} from '../redux/actions'
import LoadingComponent from "./loadingComponent";
import {DEFAULT_VIEW_STYLE} from '../utils/utils'


const CatalogComponent = (props) => {
    const renderProduct = ({item, index}) => (

        <TouchableOpacity key={index}
                          style={styles.listItem}
                          onPress={() => {props.navigation.navigate('Product', {productId: item.id});}}>

            <Image source={{ uri: item.image}} style={styles.productImage}/>

            <View style={styles.productDetails}>
                <Text>Id: {item.id}</Text>
                <Text>{item.name}</Text>
                <Text>Price: ${item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    const loadMore = () => {
        props.fetchProducts(props.page+1);
    }

    useEffect(() => {
        if(props.page === 0)
            loadMore()
    }, []);


    return(
        <View style={{alignItems: 'center'}}>
            <TextInput placeholder="Search"
                       style={styles.searchBar}
                       onChangeText={(text) => props.searchProduct(text)}
            />
            <FlatList data={props.products}
                      style={styles.list}
                      renderItem={renderProduct}
                      onEndReached={loadMore}
                      onEndReachedThreshold={0.1}/>
            <LoadingComponent isLoading={props.isLoading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    list : {marginBottom: 50},
    searchBar: {backgroundColor: 'white', width: '100%', borderColor: 'gray', borderWidth: 0.5, height: 50},
    listItem: {flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 0.5},
    productImage: { height: 100, width: 100, margin: 5},
    productDetails: {margin: 10}


});


const mapDispatchToProps = (dispatch) => ({
    fetchProducts: (page) => fetchProducts(page, dispatch),
    searchProduct: (text) => searchProduct(text, dispatch)
});

const mapStateToProps = (state) => ({
    products: state.catalog.data,
    isLoading: state.catalog.isLoading,
    page: state.catalog.page
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogComponent)
