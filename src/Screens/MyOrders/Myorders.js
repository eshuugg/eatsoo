import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';

const MyOrders = () => {
  const orders = [
    {
      id: '1',
      name: 'Pizza Paradise',
      date: '2025-01-10',
      status: 'Delivered',
      total: '$25.00',
      image: require('../../assets/img/restaurant1.jpg'),
    },
    {
      id: '2',
      name: 'Burger Barn',
      date: '2025-01-08',
      status: 'Pending',
      total: '$15.00',
      image: require('../../assets/img/restaurant2.jpg'),
    },
    {
      id: '3',
      name: 'Sushi World',
      date: '2025-01-05',
      status: 'Cancelled',
      total: '$40.00',
      image: require('../../assets/img/restaurant3.jpg'),
    },
  ];

  const renderOrder = ({item}) => (
    <TouchableOpacity style={styles.orderCard}>
      <Image source={item.image} style={styles.orderImage} />
      <View style={styles.orderInfo}>
        <Text style={styles.orderName}>{item.name}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
        <Text style={styles.orderStatus}>Status: {item.status}</Text>
        <Text style={styles.orderTotal}>Total: {item.total}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="My Orders"
        showBackButton={true}
        showProfileButton={true}
      />
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  listContent: {
    paddingHorizontal: 15,
  },
  orderCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  orderImage: {
    width: 80,
    height: 80,
  },
  orderInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#555',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  orderTotal: {
    fontSize: 14,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
});

export default MyOrders;
