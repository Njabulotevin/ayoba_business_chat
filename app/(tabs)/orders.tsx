import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const orders = [
  { id: '1', name: 'Sam', items: 'T-shirt, Cap', price: 'R460.00', status: 'Pending Payment' },
  ];

const OrderScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <TouchableOpacity onPress={()=>router.push("/OrderDetails")}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileIconText}>S</Text>
            </View>
            <View style={styles.orderDetails}>
              <Text style={styles.orderName}>{item.name}</Text>
              <Text style={styles.orderItems}>{item.items}</Text>
            </View>
            <View style={styles.orderInfo} >
              <Text style={styles.orderPrice}>{item.price}</Text>
              <Text style={styles.orderStatus}>{item.status}</Text>
            </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.newOrderButton}>
        <Text style={styles.newOrderButtonText}>+ New Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ba68c8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileIconText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  orderDetails: {
    flex: 1,
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderItems: {
    fontSize: 14,
    color: '#777',
  },
  orderInfo: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 14,
    color: '#777',
  },
  newOrderButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 150,
  },
  newOrderButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
