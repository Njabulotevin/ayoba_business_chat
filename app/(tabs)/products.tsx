import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    // Simulating a network request to fetch products
    const fetchProducts = async () => {
      try {
        // Here you can replace this with a real API call if needed
        const dummyProducts = [
          { id: 1, name: 'T-Shirt', price: 'R100.00', image: 'https://via.placeholder.com/80' },
          { id: 2, name: 'Jeans', price: 'R200.00', image: 'https://via.placeholder.com/80' },
          { id: 3, name: 'Hoddie', price: 'R300.00', image: 'https://via.placeholder.com/80' },
          { id: 4, name: 'Uzzi Jacket', price: 'R400.00', image: 'https://via.placeholder.com/80' },
        ];

        setProducts(dummyProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        Alert.alert('Error', 'Failed to load products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    router.push('/AddProduct');
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.productList}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonText}>+ Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  productList: {
    paddingBottom: 80,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 150,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
