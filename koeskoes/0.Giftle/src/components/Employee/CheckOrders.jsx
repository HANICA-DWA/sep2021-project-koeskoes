import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, setSearch, setPageNumber } from '../../redux/actions/orderActions';
import qrcode from '../Common/CreateQRcode';

const CheckOrders = () => {
  // Local variables
  const dispatch = useDispatch();
  const orders = useSelector((state) => (state.orders.searchParams ? state.orders.filteredOrders : state.orders.orders));
  const pageNumber = useSelector((state) => state.orders.pageNumber);
  const [pageNumbers, setPageNumbers] = useState(null);
  const searchParams = useSelector((state) => state.orders.searchParams);

  // Use effect to update the list of orders.
  useEffect(() => {
    if (orders.length === 0) {
      dispatch(getOrders());
    }
  }, [orders, dispatch]);

  /**
   * This function will update the list of orders to a usable list of orders.
   * This list can be used in a table that employees use before sending out orders.
   *
   * @author Sjoerd de Bruin
   *
   */
  const orderList = () => {
    if (orders.length !== 0) {
      const mappedOrders = () => {
        if (orders.length > 10) {
          let i,j, temporary = [], chunk = 10;
          for (i = 0,j = orders.length; i < j; i += chunk) {
            temporary.push(orders.slice(i, i + chunk));
          }
          
          if (pageNumbers !== temporary.length) {
            setPageNumbers(temporary.length);
          }

          return temporary;
        }
        else {
          const newOrders = [orders];
          
          if (pageNumbers !== newOrders.length) {
            setPageNumbers(newOrders.length);
          }

          return newOrders;
        };
      }

      return mappedOrders()[pageNumber-1].map(order => {
        return <tr key={order._id}>
          <th scope="row">{order._id}</th>
          <td>{order.emailGifter}</td>
          <td>{order.emailGifter}</td>
          <td>{order.firstnameReceiver + ' ' + order.lastnameReceiver}</td>
          <td>{order.emailReceiver}</td>
          <td><button className="btn btn-primary" onClick={(e) => createQRCode(order._id)}>Maak QR-code</button></td>
        </tr>;
      });
    }
    return null;
  }

  /**
   * This function will create the pagination for the table so employees can move through different pages of orders.
   *
   * @author Sjoerd de Bruin
   *
   */
  const pagination = () => {
    const pages = [];
    
    for (let i = 1; i <= pageNumbers; i++) {
      pages.push(<li key={i} className={"page-item " + (pageNumber === i ? 'disabled' : '')} onClick={(e) => dispatch(setPageNumber(i))}><span className="page-link">{i}</span></li>);
    }

    return <ul className="pagination">
      <li key={'lt'} className={"page-item " + (pageNumber === 1 ? 'disabled' : '')} onClick={(e) => (pageNumber !== 1 ? dispatch(setPageNumber(pageNumber-1)) : null)}><span className="page-link">&lt;&lt;</span></li>
      {pages}
      <li key={'gt'} className={"page-item " + (pageNumber >= pageNumbers ? 'disabled' : '')} onClick={(e) => (pageNumber < pageNumbers ? dispatch(setPageNumber(pageNumber+1)) : null)}><span className="page-link">&gt;&gt;</span></li>
    </ul>
  }

  /**
   * This function will create a QR-code with a data string.
   * This QR-code will be downloaded to the local machine.
   *
   * @author Sjoerd de Bruin
   *
   */
  const createQRCode = async (orderNumber) => {
    const qrCode = qrcode('https://www.youtube.com/watch?v=BNflNL40T_M');

    await axios.patch('http://localhost:4000/orders/', {orderNumber});

    dispatch(getOrders());

    qrCode.download({ name: orderNumber, extension: "png" });
  }

  return (
    <div className="vertical-center colored-background">
      <div className="container-flex text-center rounded p-3 bg-light">
        <label htmlFor="searchParams">Zoeken: </label> <input type="text" name="searchParams" id="searchParams" onChange={(e) => dispatch(setSearch(e.target.value))} value={searchParams} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Ordernummer</th>
              <th scope="col">Naam koper</th>
              <th scope="col">E-mail koper</th>
              <th scope="col">Naam ontvanger</th>
              <th scope="col">E-mail ontvanger</th>
              <th scope="col">QR-code</th>
            </tr>
          </thead>
          <tbody>
            {orderList()}
          </tbody>
        </table>
        {pagination()}
      </div>
    </div>
  );
}

export default CheckOrders;
