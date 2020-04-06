import React, { Component } from 'react';
import StyleItemRows from './style-item-rows';
import './style-item-form.css';

export default class StyleItemForm extends Component {
  constructor(props) {
    super(props);

    this.renderAfterLoad = () => {
      if (this.state.loaded) {
        return (
          <div>
            <div className='style-item-row'>
              <div className='style-item-col'><h5>SKU</h5></div>
              <div className='style-item-col'><h5>Attributes</h5></div>
              <div className='style-item-col'><h5>Price</h5></div>
              <div className='style-item-col'><h5>Quantity</h5></div>
              <div className='style-item-col'><h5>Add to Cart</h5></div>
            </div>

            <StyleItemRows styleItemProducts={this.state.styleItemProducts} message={this.state.message} changeQty={this.changeQty} addToCart={this.addToCart} />

          </div>
        )
      }
    }

    this.changeQty = (styleItemProductId, qty) => {
      this.setState({ message: '' });
      const lineItems = [...this.state.lineItems];

      lineItems.forEach(item => {
        if (item.styleItemProductId == styleItemProductId) {
          item.quantity = parseInt(qty)
          console.log(`For Product ID ${styleItemProductId}, quantity was changed to ${item.quantity}`)
        }
      })

      this.setState({
        lineItems: lineItems
      })
    }

    this.addToCart = (styleItemProductId, e) => {
      e.target.disabled;
      const lineItems = [...this.state.lineItems];
      let itemToAddToCart = [];

      lineItems.forEach(item => {
        if (styleItemProductId == item.styleItemProductId) {
          if (item.quantity < 1 || isNaN(item.quantity)) {
            this.setState({ message: 'Please set a quantity before adding to cart.' })
          } else {
            this.setState({ message: 'Adding items to your cart...' })
            itemToAddToCart = [{ quantity: item.quantity, productId: styleItemProductId }]
            fetch(`/api/storefront/cart`)
              .then(response => response.json())
              .then(cart => {
                if (cart.length > 0) {
                  return addToExistingCart(cart[0].id);
                } else {
                  return createNewCart();
                }
              })
              .then(() => {
                /**
                 * @RoseJohnson You can optionally call the window.location.reload() method to reload the window, 
                 * but I've left it so that the customer can rapidly add multiple lines to cart without leaving the page
                 */
                this.setState({ message: `Added ${item.quantity} units to cart!` })
              })
              .catch(err => console.log(err))
          }
        }
      })

      async function createNewCart() {
        const response = await fetch(`/api/storefront/carts`, {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({ lineItems: itemToAddToCart })
        });
        const data = await response.json();
        if (!response.ok) {
          console.log("Response", response)
          console.log("itemToAddToCart", JSON.stringify({ lineItems: itemToAddToCart }));
          return Promise.reject("There was an issue adding items to your cart. Please try again.");
        } else {
          console.log(data);
        }
      }

      async function addToExistingCart(cart_id) {
        const response = await fetch(`/api/storefront/carts/${cart_id}/items`, {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({ lineItems: itemToAddToCart })
        });
        const data = await response.json();
        if (!response.ok) {
          console.log("Response", response)
          console.log("itemToAddToCart", JSON.stringify({ lineItems: itemToAddToCart }));
          return Promise.reject("There was an issue adding items to your cart. Please try again.");
        } else {
          console.log(data);
        }
      }
    }

    this.state = {
      /**
       * @HawkSearch this is the data that comes back from the componentDidMount method below
       */

      styleItemProducts: [
        {
          "availability": "available",
          "availability_description": "",
          "base_variant_id": 78,
          "bin_picking_number": "",
          "brand_id": 0,
          "calculated_price": 10,
          "categories": [
            24
          ],
          "condition": "New",
          "cost_price": 0,
          "custom_fields": [
            {
              "id": 2,
              "name": "STYLE_ITEM_ID",
              "value": "112"
            },
            {
              "id": 3,
              "name": "SEL_Grit",
              "value": "50"
            }
          ],
          "custom_url": {
            "is_customized": true,
            "url": "/style-sku-1/"
          },
          "date_created": "2020-04-05T18:08:50+00:00",
          "date_modified": "2020-04-05T18:12:53+00:00",
          "depth": 0,
          "description": "<p>STYLE SKU 1</p>",
          "fixed_cost_shipping_price": 0,
          "gift_wrapping_options_list": [],
          "gift_wrapping_options_type": "any",
          "gtin": "",
          "height": 0,
          "id": 113,
          "inventory_level": 0,
          "inventory_tracking": "none",
          "inventory_warning_level": 0,
          "is_condition_shown": false,
          "is_featured": false,
          "is_free_shipping": false,
          "is_preorder_only": false,
          "is_price_hidden": false,
          "is_visible": true,
          "layout_file": "product.html",
          "map_price": 0,
          "meta_description": "",
          "meta_keywords": [],
          "mpn": "",
          "name": "STYLE SKU 1",
          "open_graph_description": "",
          "open_graph_title": "",
          "open_graph_type": "product",
          "open_graph_use_image": true,
          "open_graph_use_meta_description": true,
          "open_graph_use_product_name": true,
          "option_set_display": "right",
          "option_set_id": null,
          "order_quantity_maximum": 0,
          "order_quantity_minimum": 0,
          "page_title": "STYLE SKU 1",
          "preorder_message": "",
          "preorder_release_date": null,
          "price": 10,
          "price_hidden_label": "",
          "primary_image": {
            "date_modified": "2020-04-05T18:14:32+00:00",
            "description": "",
            "id": 383,
            "image_file": "b/633/076308496654__39980.jpg",
            "is_thumbnail": true,
            "product_id": 113,
            "sort_order": 0,
            "url_standard": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/113/images/383/076308496654__39980.1586110472.386.513.jpg?c=1",
            "url_thumbnail": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/113/images/383/076308496654__39980.1586110472.220.290.jpg?c=1",
            "url_tiny": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/113/images/383/076308496654__39980.1586110472.44.58.jpg?c=1",
            "url_zoom": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/113/images/383/076308496654__39980.1586110472.1280.1280.jpg?c=1"
          },
          "product_tax_code": "",
          "related_products": [
            -1
          ],
          "retail_price": 0,
          "reviews_count": 0,
          "reviews_rating_sum": 0,
          "sale_price": 0,
          "search_keywords": "",
          "sku": "STYLE-SKU-1",
          "sort_order": 0,
          "tax_class_id": 0,
          "total_sold": 0,
          "type": "physical",
          "upc": "",
          "view_count": 0,
          "warranty": "",
          "weight": 1,
          "width": 0
        },
        {
          "availability": "available",
          "availability_description": "",
          "base_variant_id": 79,
          "bin_picking_number": "",
          "brand_id": 0,
          "calculated_price": 10,
          "categories": [
            24
          ],
          "condition": "New",
          "cost_price": 0,
          "custom_fields": [
            {
              "id": 4,
              "name": "STYLE_ITEM_ID",
              "value": "112"
            },
            {
              "id": 5,
              "name": "SEL_Grit",
              "value": "60"
            }
          ],
          "custom_url": {
            "is_customized": true,
            "url": "/style-sku-2/"
          },
          "date_created": "2020-04-05T18:08:51+00:00",
          "date_modified": "2020-04-05T18:12:53+00:00",
          "depth": 0,
          "description": "<p>STYLE SKU 2</p>",
          "fixed_cost_shipping_price": 0,
          "gift_wrapping_options_list": [],
          "gift_wrapping_options_type": "any",
          "gtin": "",
          "height": 0,
          "id": 114,
          "inventory_level": 0,
          "inventory_tracking": "none",
          "inventory_warning_level": 0,
          "is_condition_shown": false,
          "is_featured": false,
          "is_free_shipping": false,
          "is_preorder_only": false,
          "is_price_hidden": false,
          "is_visible": true,
          "layout_file": "product.html",
          "map_price": 0,
          "meta_description": "",
          "meta_keywords": [],
          "mpn": "",
          "name": "STYLE SKU 2",
          "open_graph_description": "",
          "open_graph_title": "",
          "open_graph_type": "product",
          "open_graph_use_image": true,
          "open_graph_use_meta_description": true,
          "open_graph_use_product_name": true,
          "option_set_display": "right",
          "option_set_id": null,
          "order_quantity_maximum": 0,
          "order_quantity_minimum": 0,
          "page_title": "STYLE SKU 2",
          "preorder_message": "",
          "preorder_release_date": null,
          "price": 10,
          "price_hidden_label": "",
          "primary_image": {
            "date_modified": "2020-04-05T18:14:23+00:00",
            "description": "",
            "id": 382,
            "image_file": "b/978/076308496654__88880.jpg",
            "is_thumbnail": true,
            "product_id": 114,
            "sort_order": 0,
            "url_standard": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/114/images/382/076308496654__88880.1586110463.386.513.jpg?c=1",
            "url_thumbnail": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/114/images/382/076308496654__88880.1586110463.220.290.jpg?c=1",
            "url_tiny": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/114/images/382/076308496654__88880.1586110463.44.58.jpg?c=1",
            "url_zoom": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/114/images/382/076308496654__88880.1586110463.1280.1280.jpg?c=1"
          },
          "product_tax_code": "",
          "related_products": [
            -1
          ],
          "retail_price": 0,
          "reviews_count": 0,
          "reviews_rating_sum": 0,
          "sale_price": 0,
          "search_keywords": "",
          "sku": "STYLE-SKU-2",
          "sort_order": 0,
          "tax_class_id": 0,
          "total_sold": 0,
          "type": "physical",
          "upc": "",
          "view_count": 0,
          "warranty": "",
          "weight": 1,
          "width": 0
        },
        {
          "availability": "available",
          "availability_description": "",
          "base_variant_id": 80,
          "bin_picking_number": "",
          "brand_id": 0,
          "calculated_price": 10,
          "categories": [
            24
          ],
          "condition": "New",
          "cost_price": 0,
          "custom_fields": [
            {
              "id": 6,
              "name": "STYLE_ITEM_ID",
              "value": "112"
            },
            {
              "id": 7,
              "name": "SEL_Grit",
              "value": "80"
            }
          ],
          "custom_url": {
            "is_customized": true,
            "url": "/style-sku-3/"
          },
          "date_created": "2020-04-05T18:08:51+00:00",
          "date_modified": "2020-04-05T18:12:53+00:00",
          "depth": 0,
          "description": "<p>STYLE SKU 3</p>",
          "fixed_cost_shipping_price": 0,
          "gift_wrapping_options_list": [],
          "gift_wrapping_options_type": "any",
          "gtin": "",
          "height": 0,
          "id": 115,
          "inventory_level": 0,
          "inventory_tracking": "none",
          "inventory_warning_level": 0,
          "is_condition_shown": false,
          "is_featured": false,
          "is_free_shipping": false,
          "is_preorder_only": false,
          "is_price_hidden": false,
          "is_visible": true,
          "layout_file": "product.html",
          "map_price": 0,
          "meta_description": "",
          "meta_keywords": [],
          "mpn": "",
          "name": "STYLE SKU 3",
          "open_graph_description": "",
          "open_graph_title": "",
          "open_graph_type": "product",
          "open_graph_use_image": true,
          "open_graph_use_meta_description": true,
          "open_graph_use_product_name": true,
          "option_set_display": "right",
          "option_set_id": null,
          "order_quantity_maximum": 0,
          "order_quantity_minimum": 0,
          "page_title": "STYLE SKU 3",
          "preorder_message": "",
          "preorder_release_date": null,
          "price": 10,
          "price_hidden_label": "",
          "primary_image": {
            "date_modified": "2020-04-05T18:14:15+00:00",
            "description": "",
            "id": 381,
            "image_file": "g/863/076308496654__68246.jpg",
            "is_thumbnail": true,
            "product_id": 115,
            "sort_order": 0,
            "url_standard": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/115/images/381/076308496654__68246.1586110455.386.513.jpg?c=1",
            "url_thumbnail": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/115/images/381/076308496654__68246.1586110455.220.290.jpg?c=1",
            "url_tiny": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/115/images/381/076308496654__68246.1586110455.44.58.jpg?c=1",
            "url_zoom": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/115/images/381/076308496654__68246.1586110455.1280.1280.jpg?c=1"
          },
          "product_tax_code": "",
          "related_products": [
            -1
          ],
          "retail_price": 0,
          "reviews_count": 0,
          "reviews_rating_sum": 0,
          "sale_price": 0,
          "search_keywords": "",
          "sku": "STYLE-SKU-3",
          "sort_order": 0,
          "tax_class_id": 0,
          "total_sold": 0,
          "type": "physical",
          "upc": "",
          "view_count": 0,
          "warranty": "",
          "weight": 1,
          "width": 0
        },
        {
          "availability": "available",
          "availability_description": "",
          "base_variant_id": 81,
          "bin_picking_number": "",
          "brand_id": 0,
          "calculated_price": 10,
          "categories": [
            24
          ],
          "condition": "New",
          "cost_price": 0,
          "custom_fields": [
            {
              "id": 8,
              "name": "STYLE_ITEM_ID",
              "value": "112"
            },
            {
              "id": 9,
              "name": "SEL_Grit",
              "value": "100"
            }
          ],
          "custom_url": {
            "is_customized": true,
            "url": "/style-sku-4/"
          },
          "date_created": "2020-04-05T18:08:51+00:00",
          "date_modified": "2020-04-05T18:12:54+00:00",
          "depth": 0,
          "description": "<p>STYLE SKU 4</p>",
          "fixed_cost_shipping_price": 0,
          "gift_wrapping_options_list": [],
          "gift_wrapping_options_type": "any",
          "gtin": "",
          "height": 0,
          "id": 116,
          "inventory_level": 0,
          "inventory_tracking": "none",
          "inventory_warning_level": 0,
          "is_condition_shown": false,
          "is_featured": false,
          "is_free_shipping": false,
          "is_preorder_only": false,
          "is_price_hidden": false,
          "is_visible": true,
          "layout_file": "product.html",
          "map_price": 0,
          "meta_description": "",
          "meta_keywords": [],
          "mpn": "",
          "name": "STYLE SKU 4",
          "open_graph_description": "",
          "open_graph_title": "",
          "open_graph_type": "product",
          "open_graph_use_image": true,
          "open_graph_use_meta_description": true,
          "open_graph_use_product_name": true,
          "option_set_display": "right",
          "option_set_id": null,
          "order_quantity_maximum": 0,
          "order_quantity_minimum": 0,
          "page_title": "STYLE SKU 4",
          "preorder_message": "",
          "preorder_release_date": null,
          "price": 10,
          "price_hidden_label": "",
          "primary_image": {
            "date_modified": "2020-04-05T18:14:05+00:00",
            "description": "",
            "id": 380,
            "image_file": "g/741/076308496654__68882.jpg",
            "is_thumbnail": true,
            "product_id": 116,
            "sort_order": 0,
            "url_standard": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/116/images/380/076308496654__68882.1586110445.386.513.jpg?c=1",
            "url_thumbnail": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/116/images/380/076308496654__68882.1586110445.220.290.jpg?c=1",
            "url_tiny": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/116/images/380/076308496654__68882.1586110445.44.58.jpg?c=1",
            "url_zoom": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/116/images/380/076308496654__68882.1586110445.1280.1280.jpg?c=1"
          },
          "product_tax_code": "",
          "related_products": [
            -1
          ],
          "retail_price": 0,
          "reviews_count": 0,
          "reviews_rating_sum": 0,
          "sale_price": 0,
          "search_keywords": "",
          "sku": "STYLE-SKU-4",
          "sort_order": 0,
          "tax_class_id": 0,
          "total_sold": 0,
          "type": "physical",
          "upc": "",
          "view_count": 0,
          "warranty": "",
          "weight": 1,
          "width": 0
        },
        {
          "availability": "available",
          "availability_description": "",
          "base_variant_id": 82,
          "bin_picking_number": "",
          "brand_id": 0,
          "calculated_price": 10,
          "categories": [
            24
          ],
          "condition": "New",
          "cost_price": 0,
          "custom_fields": [
            {
              "id": 10,
              "name": "STYLE_ITEM_ID",
              "value": "112"
            },
            {
              "id": 11,
              "name": "SEL_Grit",
              "value": "120"
            }
          ],
          "custom_url": {
            "is_customized": true,
            "url": "/style-sku-5/"
          },
          "date_created": "2020-04-05T18:08:51+00:00",
          "date_modified": "2020-04-05T18:12:54+00:00",
          "depth": 0,
          "description": "<p>STYLE SKU 5</p>",
          "fixed_cost_shipping_price": 0,
          "gift_wrapping_options_list": [],
          "gift_wrapping_options_type": "any",
          "gtin": "",
          "height": 0,
          "id": 117,
          "inventory_level": 0,
          "inventory_tracking": "none",
          "inventory_warning_level": 0,
          "is_condition_shown": false,
          "is_featured": false,
          "is_free_shipping": false,
          "is_preorder_only": false,
          "is_price_hidden": false,
          "is_visible": true,
          "layout_file": "product.html",
          "map_price": 0,
          "meta_description": "",
          "meta_keywords": [],
          "mpn": "",
          "name": "STYLE SKU 5",
          "open_graph_description": "",
          "open_graph_title": "",
          "open_graph_type": "product",
          "open_graph_use_image": true,
          "open_graph_use_meta_description": true,
          "open_graph_use_product_name": true,
          "option_set_display": "right",
          "option_set_id": null,
          "order_quantity_maximum": 0,
          "order_quantity_minimum": 0,
          "page_title": "STYLE SKU 5",
          "preorder_message": "",
          "preorder_release_date": null,
          "price": 10,
          "price_hidden_label": "",
          "primary_image": {
            "date_modified": "2020-04-05T18:13:50+00:00",
            "description": "",
            "id": 379,
            "image_file": "t/295/076308496654__66508.jpg",
            "is_thumbnail": true,
            "product_id": 117,
            "sort_order": 0,
            "url_standard": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/117/images/379/076308496654__66508.1586110430.386.513.jpg?c=1",
            "url_thumbnail": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/117/images/379/076308496654__66508.1586110430.220.290.jpg?c=1",
            "url_tiny": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/117/images/379/076308496654__66508.1586110430.44.58.jpg?c=1",
            "url_zoom": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/117/images/379/076308496654__66508.1586110430.1280.1280.jpg?c=1"
          },
          "product_tax_code": "",
          "related_products": [
            -1
          ],
          "retail_price": 0,
          "reviews_count": 0,
          "reviews_rating_sum": 0,
          "sale_price": 0,
          "search_keywords": "",
          "sku": "STYLE-SKU-5",
          "sort_order": 0,
          "tax_class_id": 0,
          "total_sold": 0,
          "type": "physical",
          "upc": "",
          "view_count": 0,
          "warranty": "",
          "weight": 1,
          "width": 0
        },
        {
          "availability": "available",
          "availability_description": "",
          "base_variant_id": 83,
          "bin_picking_number": "",
          "brand_id": 0,
          "calculated_price": 10,
          "categories": [
            24
          ],
          "condition": "New",
          "cost_price": 0,
          "custom_fields": [
            {
              "id": 12,
              "name": "STYLE_ITEM_ID",
              "value": "112"
            },
            {
              "id": 13,
              "name": "SEL_Grit",
              "value": "160"
            }
          ],
          "custom_url": {
            "is_customized": true,
            "url": "/style-sku-6/"
          },
          "date_created": "2020-04-05T18:08:51+00:00",
          "date_modified": "2020-04-05T18:12:54+00:00",
          "depth": 0,
          "description": "<p>STYLE SKU 6</p>",
          "fixed_cost_shipping_price": 0,
          "gift_wrapping_options_list": [],
          "gift_wrapping_options_type": "any",
          "gtin": "",
          "height": 0,
          "id": 118,
          "inventory_level": 0,
          "inventory_tracking": "none",
          "inventory_warning_level": 0,
          "is_condition_shown": false,
          "is_featured": false,
          "is_free_shipping": false,
          "is_preorder_only": false,
          "is_price_hidden": false,
          "is_visible": true,
          "layout_file": "product.html",
          "map_price": 0,
          "meta_description": "",
          "meta_keywords": [],
          "mpn": "",
          "name": "STYLE SKU 6",
          "open_graph_description": "",
          "open_graph_title": "",
          "open_graph_type": "product",
          "open_graph_use_image": true,
          "open_graph_use_meta_description": true,
          "open_graph_use_product_name": true,
          "option_set_display": "right",
          "option_set_id": null,
          "order_quantity_maximum": 0,
          "order_quantity_minimum": 0,
          "page_title": "STYLE SKU 6",
          "preorder_message": "",
          "preorder_release_date": null,
          "price": 10,
          "price_hidden_label": "",
          "primary_image": {
            "date_modified": "2020-04-05T18:13:32+00:00",
            "description": "",
            "id": 378,
            "image_file": "r/032/076308496654__62647.jpg",
            "is_thumbnail": true,
            "product_id": 118,
            "sort_order": 0,
            "url_standard": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/118/images/378/076308496654__62647.1586110412.386.513.jpg?c=1",
            "url_thumbnail": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/118/images/378/076308496654__62647.1586110412.220.290.jpg?c=1",
            "url_tiny": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/118/images/378/076308496654__62647.1586110412.44.58.jpg?c=1",
            "url_zoom": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/118/images/378/076308496654__62647.1586110412.1280.1280.jpg?c=1"
          },
          "product_tax_code": "",
          "related_products": [
            -1
          ],
          "retail_price": 0,
          "reviews_count": 0,
          "reviews_rating_sum": 0,
          "sale_price": 0,
          "search_keywords": "",
          "sku": "STYLE-SKU-6",
          "sort_order": 0,
          "tax_class_id": 0,
          "total_sold": 0,
          "type": "physical",
          "upc": "",
          "view_count": 0,
          "warranty": "",
          "weight": 1,
          "width": 0
        },
        {
          "availability": "available",
          "availability_description": "",
          "base_variant_id": 84,
          "bin_picking_number": "",
          "brand_id": 0,
          "calculated_price": 10,
          "categories": [
            24
          ],
          "condition": "New",
          "cost_price": 0,
          "custom_fields": [
            {
              "id": 14,
              "name": "STYLE_ITEM_ID",
              "value": "112"
            },
            {
              "id": 15,
              "name": "SEL_Grit",
              "value": "200"
            }
          ],
          "custom_url": {
            "is_customized": true,
            "url": "/style-sku-7/"
          },
          "date_created": "2020-04-05T18:08:51+00:00",
          "date_modified": "2020-04-05T18:12:54+00:00",
          "depth": 0,
          "description": "<p>STYLE SKU 7</p>",
          "fixed_cost_shipping_price": 0,
          "gift_wrapping_options_list": [],
          "gift_wrapping_options_type": "any",
          "gtin": "",
          "height": 0,
          "id": 119,
          "inventory_level": 0,
          "inventory_tracking": "none",
          "inventory_warning_level": 0,
          "is_condition_shown": false,
          "is_featured": false,
          "is_free_shipping": false,
          "is_preorder_only": false,
          "is_price_hidden": false,
          "is_visible": true,
          "layout_file": "product.html",
          "map_price": 0,
          "meta_description": "",
          "meta_keywords": [],
          "mpn": "",
          "name": "STYLE SKU 7",
          "open_graph_description": "",
          "open_graph_title": "",
          "open_graph_type": "product",
          "open_graph_use_image": true,
          "open_graph_use_meta_description": true,
          "open_graph_use_product_name": true,
          "option_set_display": "right",
          "option_set_id": null,
          "order_quantity_maximum": 0,
          "order_quantity_minimum": 0,
          "page_title": "STYLE SKU 7",
          "preorder_message": "",
          "preorder_release_date": null,
          "price": 10,
          "price_hidden_label": "",
          "primary_image": {
            "date_modified": "2020-04-05T18:13:23+00:00",
            "description": "",
            "id": 377,
            "image_file": "x/104/076308496654__44223.jpg",
            "is_thumbnail": true,
            "product_id": 119,
            "sort_order": 0,
            "url_standard": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/119/images/377/076308496654__44223.1586110403.386.513.jpg?c=1",
            "url_thumbnail": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/119/images/377/076308496654__44223.1586110403.220.290.jpg?c=1",
            "url_tiny": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/119/images/377/076308496654__44223.1586110403.44.58.jpg?c=1",
            "url_zoom": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/119/images/377/076308496654__44223.1586110403.1280.1280.jpg?c=1"
          },
          "product_tax_code": "",
          "related_products": [
            -1
          ],
          "retail_price": 0,
          "reviews_count": 0,
          "reviews_rating_sum": 0,
          "sale_price": 0,
          "search_keywords": "",
          "sku": "STYLE-SKU-7",
          "sort_order": 0,
          "tax_class_id": 0,
          "total_sold": 0,
          "type": "physical",
          "upc": "",
          "view_count": 0,
          "warranty": "",
          "weight": 1,
          "width": 0
        },
        {
          "availability": "available",
          "availability_description": "",
          "base_variant_id": 85,
          "bin_picking_number": "",
          "brand_id": 0,
          "calculated_price": 10,
          "categories": [
            24
          ],
          "condition": "New",
          "cost_price": 0,
          "custom_fields": [
            {
              "id": 16,
              "name": "STYLE_ITEM_ID",
              "value": "112"
            },
            {
              "id": 17,
              "name": "SEL_Grit",
              "value": "220"
            }
          ],
          "custom_url": {
            "is_customized": true,
            "url": "/style-sku-8/"
          },
          "date_created": "2020-04-05T18:08:51+00:00",
          "date_modified": "2020-04-05T18:12:54+00:00",
          "depth": 0,
          "description": "<p>STYLE SKU 8</p>",
          "fixed_cost_shipping_price": 0,
          "gift_wrapping_options_list": [],
          "gift_wrapping_options_type": "any",
          "gtin": "",
          "height": 0,
          "id": 120,
          "inventory_level": 0,
          "inventory_tracking": "none",
          "inventory_warning_level": 0,
          "is_condition_shown": false,
          "is_featured": false,
          "is_free_shipping": false,
          "is_preorder_only": false,
          "is_price_hidden": false,
          "is_visible": true,
          "layout_file": "product.html",
          "map_price": 0,
          "meta_description": "",
          "meta_keywords": [],
          "mpn": "",
          "name": "STYLE SKU 8",
          "open_graph_description": "",
          "open_graph_title": "",
          "open_graph_type": "product",
          "open_graph_use_image": true,
          "open_graph_use_meta_description": true,
          "open_graph_use_product_name": true,
          "option_set_display": "right",
          "option_set_id": null,
          "order_quantity_maximum": 0,
          "order_quantity_minimum": 0,
          "page_title": "STYLE SKU 8",
          "preorder_message": "",
          "preorder_release_date": null,
          "price": 10,
          "price_hidden_label": "",
          "primary_image": {
            "date_modified": "2020-04-05T18:13:14+00:00",
            "description": "",
            "id": 376,
            "image_file": "d/054/076308496654__48271.jpg",
            "is_thumbnail": true,
            "product_id": 120,
            "sort_order": 0,
            "url_standard": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/120/images/376/076308496654__48271.1586110394.386.513.jpg?c=1",
            "url_thumbnail": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/120/images/376/076308496654__48271.1586110394.220.290.jpg?c=1",
            "url_tiny": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/120/images/376/076308496654__48271.1586110394.44.58.jpg?c=1",
            "url_zoom": "https://cdn11.bigcommerce.com/s-4vlb8a0qzl/products/120/images/376/076308496654__48271.1586110394.1280.1280.jpg?c=1"
          },
          "product_tax_code": "",
          "related_products": [
            -1
          ],
          "retail_price": 0,
          "reviews_count": 0,
          "reviews_rating_sum": 0,
          "sale_price": 0,
          "search_keywords": "",
          "sku": "STYLE-SKU-8",
          "sort_order": 0,
          "tax_class_id": 0,
          "total_sold": 0,
          "type": "physical",
          "upc": "",
          "view_count": 0,
          "warranty": "",
          "weight": 1,
          "width": 0
        }
      ],
      lineItems: [
        {
          styleItemProductId: 113,
          quantity: 0
        },
        {
          styleItemProductId: 114,
          quantity: 0
        },
        {
          styleItemProductId: 115,
          quantity: 0
        },
        {
          styleItemProductId: 116,
          quantity: 0
        },
        {
          styleItemProductId: 117,
          quantity: 0
        },
        {
          styleItemProductId: 118,
          quantity: 0
        },
        {
          styleItemProductId: 119,
          quantity: 0
        },
        {
          styleItemProductId: 120,
          quantity: 0
        },
      ],
      loaded: true,
      message: ''
    }
  }

  componentDidMount() {
    /**
     * @HawkSearch This is where Rose will make an API call to get all of the products that should be on the bulk order page. What
     * is the endpoint that she needs to be calling? Is it a custom middleware that simply reaches out to the BigCommerce
     * Catalog API? Or, is it some sort of Hawksearch endpoint that we'll be getting the data from Hawksearch after Hawksearch 
     * goes through and sanitizes it?
     * 
     * this.setState({ loaded: false })
     * fetch(`https://xxxxxxxxx.execute-api.region.amazonaws.com/default/middleware-endpoint?product_id=${this.props.productID}`) <-- What should this URL be?
     * this.setState({ styleItemProducts: data, loaded: true })
     * 
     * @RoseJohnson This breaks with Pinnacle because there's a conflict in the babel loader. Compare the package.json of this theme with the 
     * package.json of the Pinnacle theme, you'll notice the difference in "@babel/core": "^7.4.5" on this theme, vs. "babel-core": "^6.26.0"
     * on the Pinnacle theme, etc.
     * You might be able to use this blog post:
     * https://medium.com/bigcommerce-developer-blog/build-a-bulk-order-form-using-the-bigcommerce-storefront-api-and-react-a9f73ec7f0d6
     * And follow the installation steps for Cornerstone 3.0 and earlier
     * 
     * @RoseJohnson Also, you'll probably want to write another react component for a button that sits on the product detail pages of styleItemProducts
     * that says "More Options" that reads the "STYLE_ITEM_ID" custom field and makes a call to the GET product API and then creates a link for the user
     * to navigate from that page to the Style Item page. 
     * 
     * @Klingspor If you want to do a bulk add to cart, you have to take the "Add to Cart" buttons out of the style-item-rows.jsx and 
     * add them to this component, then you have to rewrite the this.addToCart() method.
     */
  }

  render() {
    return (
      <div>
        <div id='style-item-messaging'>{this.state.message}</div>
        <div className='style-item-form-field'>
          {this.renderAfterLoad()}
        </div>
      </div>
    )
  }
}