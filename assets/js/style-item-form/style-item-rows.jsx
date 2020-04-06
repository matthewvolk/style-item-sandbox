import React from 'react';
import './style-item-rows.css'

const filterAttributes = (custom_fields) => {
  const filteredAttributes = custom_fields.map((custom_field, index) => {
    if (custom_field.name.includes("SEL_")) {
      return <p key={index}><strong>{custom_field.name.replace("SEL_", "")}</strong>: {custom_field.value}</p>
    }
  })
  return filteredAttributes;
}

const styleItemRows = (props) => {
  const styleItemProducts = props.styleItemProducts;
  const styleItemRows = styleItemProducts.map((styleItemProduct, index) => {
    return (
      <div key={index} className='style-item-row'>
        <div className='style-item-col'><a className='style-item-link' href={styleItemProduct.custom_url.url}>{styleItemProduct.sku}</a></div>
        <div className='style-item-col'>{filterAttributes(styleItemProduct.custom_fields)}</div>
        <div className='style-item-col' style={{ color: "#1f9900", fontWeight: 700 }}>${parseFloat(styleItemProduct.price).toPrecision(4)}</div>
        <div className='style-item-col'>
          <input
            type='number'
            min='0'
            placeholder='0'
            className='qtyField'
            onChange={(e) => props.changeQty(styleItemProduct.id, e.target.value)}
          />
        </div>
        <div className='style-item-button-row'>
          <button
            className='style-item-col button button--primary'
            id='styleItemAddToCart'
            onClick={(e) => props.addToCart(styleItemProduct.id, e)}
          >Add to Cart</button>
        </div>
      </div>
    )
  })
  return styleItemRows;
}
export default styleItemRows;