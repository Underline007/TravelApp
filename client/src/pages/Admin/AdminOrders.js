// AdminOrders.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tag, Button, Modal, Select } from 'antd';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';

const { Option } = Select;

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [newStatus, setNewStatus] = useState(null);

    const fetchOrderDetails = async (order) => {
        try {
            const destinationResponse = await axios.get(`/api/v1/destination/destination-name/${order.destination}`);
            const buyerResponse = await axios.get(`/api/v1/auth/tourguide-name/${order.buyer}`);
            const tourGuideResponse = await axios.get(`/api/v1/auth/tourguide-name/${order.tourGuide}`);

            return {
                destination: destinationResponse.data.name,
                buyer: buyerResponse.data.name,
                tourGuide: tourGuideResponse.data.name,
            };
        } catch (error) {
            console.error('Error fetching order details:', error);
            return {};
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/v1/order/all-orders');
                const ordersWithDetails = await Promise.all(
                    response.data.map(async (order) => {
                        const details = await fetchOrderDetails(order);
                        return { ...order, ...details };
                    })
                );
                setOrders(ordersWithDetails);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleStatusUpdate = async () => {
        try {
            const response = await axios.put(`/api/v1/order/order-status/${selectedOrderId}`, { status: newStatus });
            const updatedOrder = response.data;

            // Update the orders state with the updated order
            setOrders((prevOrders) =>
                prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
            );

            // Close the modal
            setVisible(false);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination',
        },
        {
            title: 'Buyer',
            dataIndex: 'buyer',
            key: 'buyer',
        },
        {
            title: 'Tour Guide',
            dataIndex: 'tourGuide',
            key: 'tourGuide',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Appointment Meeting',
            dataIndex: 'appointmentMeeting',
            key: 'appointmentMeeting',
        },
        {
            title: 'Amount($)',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color, text;
                switch (status) {
                    case 0:
                        color = 'volcano';
                        text = 'Cancelled';
                        break;
                    case 1:
                        color = 'green';
                        text = 'Paid';
                        break;
                    case 2:
                        color = 'blue';
                        text = 'On Tour';
                        break;
                    case 3:
                        color = 'purple';
                        text = 'Completed Tour';
                        break;
                    default:
                        color = 'gray';
                        text = 'Unknown';
                }
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: 'action',
            render: (orderId) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            setSelectedOrderId(orderId);
                            setVisible(true);
                        }}
                    >
                        Update Status
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Orders</h1>
                        <Table style={{ marginLeft: '-30px' }} dataSource={orders} columns={columns} />
                        <Modal
                            title="Update Order Status"
                            visible={visible}
                            onOk={handleStatusUpdate}
                            onCancel={() => setVisible(false)}
                        >
                            <p>Select new status:</p>
                            <Select style={{ width: '100%' }} onChange={(value) => setNewStatus(value)}>
                                <Option value={0}>Cancelled</Option>
                                <Option value={1}>Paid</Option>
                                <Option value={2}>On Tour</Option>
                                <Option value={3}>Completed Tour</Option>
                            </Select>
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminOrders;
