// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";
// import logo2 from "../../assets/logo2.png"; // adjust path
// import { Font } from "@react-pdf/renderer";

// Font.register({
//   family: "NotoSans",
//   src: "https://fonts.gstatic.com/s/notosans/v36/o-0IIpQlx3QUlC5A4PNb4g.ttf",
// });

// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontSize: 10,
//     fontFamily: "NotoSans",
//     lineHeight: 1.4,
//   },
//   centerText: {
//     textAlign: "center",
//   },
//   companyName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 2,
//   },
//   invoiceTitle: {
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   topRow: {
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   header: {
//     backgroundColor: "#8B4513", // spice brown
//     color: "white",
//     padding: 10,
//     marginBottom: 10,
//   },
//   headerText: {
//     fontSize: 14,
//     textAlign: "center",
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   middleRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   addressRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },

//   addressBox: {
//     width: "48%",
//   },

//   sectionTitle: {
//     fontSize: 11,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   section: {
//     width: "48%",
//   },
//   sectionTitle: {
//     fontSize: 14,
//     marginBottom: 5,
//     color: "#8B4513",
//     fontWeight: "bold",
//     paddingBottom: 2,
//   },
//   rightText: {
//     textAlign: "right",
//   },
//   customerCard: {
//     backgroundColor: "#fff8f3",
//     borderWidth: 1,
//     borderColor: "#8B4513",
//     borderStyle: "solid",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   customerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 6,
//   },
//   customerField: {
//     width: "30%",
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#e0c9b0",
//     borderStyle: "solid",
//     borderRadius: 4,
//     padding: 6,
//   },
//   customerLabel: {
//     fontSize: 8,
//     color: "#8B4513",
//     marginBottom: 2,
//     fontWeight: "bold",
//   },
//   customerValue: {
//     fontSize: 10,
//     color: "#333",
//   },
//   tableContainer: {
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 4,
//     backgroundColor: "#f9f9f9",
//     padding: 2,
//   },
//   table: {
//     display: "table",
//     width: "100%",
//     borderStyle: "solid",
//     borderWidth: 1,
//   },
//   tableRow: {
//     flexDirection: "row",
//   },
//   tableColHeader: {
//     width: "12.5%",
//     padding: 4,
//     backgroundColor: "#8B4513",
//     color: "white",
//     fontWeight: "bold",
//     borderWidth: 1,
//     fontSize: 9,
//   },
//   tableCol: {
//     width: "12.5%",
//     padding: 6,
//     borderWidth: 1,
//     fontSize: 9,
//   },
//   gstSummaryBox: {
//     marginTop: 15,
//     alignSelf: "flex-end",
//     width: "50%",
//     backgroundColor: "#f8f8f8",
//     borderWidth: 1,
//     borderColor: "#e0c9b0",
//     borderRadius: 5,
//   },
//   gstRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingTop: 5,
//     paddingBottom: 5,
//     paddingLeft: 10,
//     paddingRight: 10,
//     backgroundColor: "#fff8f3",
//   },
//   gstLabel: {
//     fontSize: 9,
//     color: "#555",
//   },
//   gstDivider: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#e0c9b0",
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   gstValue: {
//     fontSize: 9,
//     color: "#333",
//     fontWeight: "bold",
//   },
//   grandTotalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#8B4513",
//     padding: 8,
//     marginTop: 0,
//     borderRadius: 0,
//   },
//   totalText: {
//     fontWeight: "bold",
//     marginTop: 4,
//     marginBottom: 6,
//   },
//   box: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderStyle: "solid",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   footer: {
//     marginTop: 20,
//     borderTopWidth: 1, // ✅
//     borderTopColor: "#8B4513", // ✅
//     paddingTop: 8,
//     textAlign: "center",
//     fontSize: 9,
//     color: "#666",
//   },
//   paidBadge: {
//     borderWidth: 2,
//     borderColor: "green",
//     borderStyle: "solid",
//     borderRadius: 4,
//     paddingTop: 6,
//     paddingBottom: 6,
//     paddingLeft: 16,
//     paddingRight: 16,
//     alignSelf: "flex-start",
//     marginTop: 4,
//     backgroundColor: "#f0fff0",
//   },
//   paidText: {
//     color: "green",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
// });

// const InvoicePDF = ({ data }) => {
//   // ----- GST CALCULATION LOGIC -----

//   // const sellerState = "Tamil Nadu"; // CHANGE to your company state
//   // const buyerState = profile?.state || "";

//   // Build calculated invoice items
//   // const processItems = orderedItems.map((item) => {
//   //   const unitPrice = item.price * item.selectedSize;
//   //   const taxableAmount = unitPrice * item.quantity;

//   //   const gstRate = Number(item.gst) || 0;

//   //   let cgstAmount = 0;
//   //   let sgstAmount = 0;
//   //   let igstAmount = 0;

//   //   if (sellerState === buyerState) {
//   //     cgstAmount = (taxableAmount * (gstRate / 2)) / 100;
//   //     sgstAmount = (taxableAmount * (gstRate / 2)) / 100;
//   //   } else {
//   //     igstAmount = (taxableAmount * gstRate) / 100;
//   //   }

//   //   const taxAmount = cgstAmount + sgstAmount + igstAmount;
//   //   const total = taxableAmount + taxAmount;

//   //   return {
//   //     ...item,
//   //     unitPrice,
//   //     taxableAmount,
//   //     cgstAmount,
//   //     sgstAmount,
//   //     igstAmount,
//   //     taxAmount,
//   //     total,
//   //   };
//   // });

//   // const taxableTotal = processItems.reduce((a, i) => a + i.taxableAmount, 0);

//   // const cgstTotal = processItems.reduce((a, i) => a + i.cgstAmount, 0);

//   // const sgstTotal = processItems.reduce((a, i) => a + i.sgstAmount, 0);

//   // const igstTotal = processItems.reduce((a, i) => a + i.igstAmount, 0);

//   // const totalGST = cgstTotal + sgstTotal + igstTotal;

//   // const grandTotal = taxableTotal + totalGST;

//   // // Group summary by GST rate
//   // const gstGroupSummary = processItems.reduce((acc, item) => {
//   //   if (!acc[item.gst]) {
//   //     acc[item.gst] = { gstRate: item.gst, gstTotal: 0 };
//   //   }
//   //   acc[item.gst].gstTotal += item.taxAmount;
//   //   return acc;
//   // }, {});

//   // ----- END GST LOGIC -----

//   const items = data?.items || [];
//   const invoiceNumber = data?.invoiceNo || "";
//   const currentDate = data?.invoiceDate || "";
//   const customerName = data?.customerName || "";
//   const customerPhone = data?.customerPhone || "";
//   const billingAddress = data?.billingAddress || "";
//   const shippingAddress = data?.shippingAddress || "";
//   const subTotal = data?.subTotal || 0;
//   const taxAmount = data?.taxAmount || 0;
//   const total = data?.totalAmount || 0;

//   const getState = (address) => {
//     if (!address) return "";
//     const parts = address.split(",");
//     const statePincode = parts[5] || "";
//     return statePincode.split("-")[0]?.trim();
//   };

//   const billingState = getState(data?.billingAddress);
//   const shippingState = getState(data?.shippingAddress);

//   const isSameState = billingState === shippingState;

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Header */}
//         {/* <View style={styles.centerText}>
//           <Text style={styles.companyName}>Spice Harvest</Text>
//           <Text style={styles.invoiceTitle}>Tax Invoice</Text>
//         </View>

//         {/* Logo */}
//         {/* <View style={styles.topRow}>
//           <Image style={styles.logo} src={logo2} />
//         </View>  */}

//         <View style={styles.header}>
//           <Text style={styles.headerText}>SPICE HARVEST - TAX INVOICE</Text>
//         </View>

//         <View style={styles.headerRow}>
//           <Image src={logo2} style={{ width: 130 }} />

//           <View style={{ textAlign: "right" }}>
//             <Text>
//               <Text style={{ fontWeight: "bold" }}>Invoice No:</Text>{" "}
//               {invoiceNumber}
//             </Text>
//             <Text>
//               <Text style={{ fontWeight: "bold" }}>Date:</Text> {currentDate}
//             </Text>
//           </View>
//         </View>
//         <View
//           style={{
//             borderBottomWidth: 1,
//             borderBottomColor: "#ccc",
//             marginTop: 10,
//             marginBottom: 10,
//           }}
//         />
//         {/* Customer Details */}
//         <View style={styles.customerCard}>
//           <Text style={styles.sectionTitle}>Customer Details</Text>
//           <View style={styles.customerRow}>
//             <View style={styles.customerField}>
//               <Text style={styles.customerLabel}>Name</Text>
//               <Text style={styles.customerValue}>{customerName}</Text>
//             </View>
//             <View style={styles.customerField}>
//               <Text style={styles.customerLabel}>Phone</Text>
//               <Text style={styles.customerValue}>{customerPhone}</Text>
//             </View>
//             <View style={styles.customerField}>
//               <Text style={styles.customerLabel}>GSTIN</Text>
//               <Text style={styles.customerValue}>29ABCDE1JJKDS</Text>
//             </View>
//           </View>
//         </View>

//         {/* Billing + Shipping */}
//         <View style={styles.addressRow}>
//           <View style={styles.addressBox}>
//             <Text style={styles.sectionTitle}>Billing Address</Text>
//             {billingAddress.split(",").map((line, i) => (
//               <Text key={i}>{line.trim()}</Text>
//             ))}
//           </View>

//           <View style={styles.addressBox}>
//             <Text style={styles.sectionTitle}>Shipping Address</Text>
//             {shippingAddress.split(",").map((line, i) => (
//               <Text key={i}>{line.trim()}</Text>
//             ))}
//           </View>
//         </View>
//         {/* Invoice Table */}
//         <View style={styles.tableContainer}>
//           <View style={styles.table}>
//             {/* Header Row */}
//             <View style={styles.tableRow}>
//               <Text style={styles.tableColHeader}>S.NO</Text>
//               <Text style={styles.tableColHeader}>Products</Text>
//               <Text style={styles.tableColHeader}>Quantity</Text>
//               <Text style={styles.tableColHeader}>Size</Text>
//               <Text style={styles.tableColHeader}>Unit Price</Text>
//               <Text style={styles.tableColHeader}>Taxable Value</Text>
//               {isSameState ? (
//                 <>
//                   <Text style={styles.tableColHeader}>CGST</Text>
//                   <Text style={styles.tableColHeader}>SGST</Text>
//                 </>
//               ) : (
//                 <Text style={styles.tableColHeader}>IGST</Text>
//               )}
//               <Text style={styles.tableColHeader}>Total</Text>
//             </View>

//             {/* Item Rows */}
//             {items.map((item, index) => (
//               <View style={styles.tableRow} key={index}>
//                 <Text style={styles.tableCol}>{index + 1}</Text>
//                 <Text style={styles.tableCol}>{item.productName}</Text>
//                 <Text style={styles.tableCol}>{item.quantity}</Text>
//                 <Text style={styles.tableCol}>{item.size}g</Text>
//                 <Text style={styles.tableCol}>
//                   {"\u20B9"}
//                   {item.unitPrice.toFixed(2)}
//                 </Text>
//                 <Text style={styles.tableCol}>
//                   {"\u20B9"}
//                   {item.unitPrice * item.quantity}
//                 </Text>
//                 {isSameState ? (
//                   <>
//                     <Text style={styles.tableCol}>
//                       {"\u20B9"}
//                       {(item.taxAmount / 2).toFixed(2)}
//                     </Text>
//                     <Text style={styles.tableCol}>
//                       {"\u20B9"}
//                       {(item.taxAmount / 2).toFixed(2)}
//                     </Text>
//                   </>
//                 ) : (
//                   <Text style={styles.tableCol}>
//                     {"\u20B9"}
//                     {item.taxAmount.toFixed(2)}
//                   </Text>
//                 )}
//                 <Text style={styles.tableCol}>
//                   {"\u20B9"}
//                   {item.total.toFixed(2)}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* GST Summary */}
//         {/* GST Summary */}
//         <View style={styles.gstSummaryBox}>
//           <View style={styles.gstRow}>
//             <Text style={styles.gstLabel}>Taxable Value</Text>
//             <Text style={styles.gstValue}>₹{subTotal}</Text>
//           </View>

//           {isSameState ? (
//             <>
//               <View style={styles.gstRow}>
//                 <Text style={styles.gstLabel}>CGST</Text>
//                 <Text style={styles.gstValue}>
//                   ₹{(taxAmount / 2).toFixed(2)}
//                 </Text>
//               </View>
//               <View style={styles.gstRow}>
//                 <Text style={styles.gstLabel}>SGST</Text>
//                 <Text style={styles.gstValue}>
//                   ₹{(taxAmount / 2).toFixed(2)}
//                 </Text>
//               </View>
//             </>
//           ) : (
//             <View style={styles.gstRow}>
//               <Text style={styles.gstLabel}>IGST</Text>
//               <Text style={styles.gstValue}>₹{taxAmount.toFixed(2)}</Text>
//             </View>
//           )}

//           <View style={styles.gstDivider} />

//           <View style={styles.gstRow}>
//             <Text style={styles.gstLabel}>Total GST</Text>
//             <Text style={styles.gstValue}>₹{taxAmount.toFixed(2)}</Text>
//           </View>

//           <View style={styles.grandTotalRow}>
//             <Text style={{ color: "white", fontWeight: "bold", fontSize: 11 }}>
//               Grand Total
//             </Text>
//             <Text style={{ color: "white", fontWeight: "bold", fontSize: 11 }}>
//               {"\u20B9"}
//               {total}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.paidBadge}>
//           <Text style={styles.paidText}>✔ PAID</Text>
//         </View>
//         <View style={styles.footer}>
//           <Text>Thank you for shopping with Spice Harvest!</Text>
//           <Text>📧 support@spiceharvest.com | 📞 +91 98765 43210</Text>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default InvoicePDF;

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo2 from "../../assets/logo2.png";
import { Font } from "@react-pdf/renderer";

Font.register({
  family: "NotoSans",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/notosans/v36/o-0IIpQlx3QUlC5A4PNb4g.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/notosans/v36/o-0IIpQlx3QUlC5A4PNb4g.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingBottom: 80,
    fontSize: 10,
    fontFamily: "NotoSans",
    lineHeight: 1.4,
  },
  header: {
    backgroundColor: "#8B4513",
    padding: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 5,
    color: "#8B4513",
    fontWeight: "bold",
    paddingBottom: 2,
  },
  customerCard: {
    backgroundColor: "#fff8f3",
    borderWidth: 1,
    borderColor: "#8B4513",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  customerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  customerField: {
    width: "30%",
  },
  customerLabel: {
    fontSize: 12,
    color: "#8B4513",
    marginBottom: 2,
    fontWeight: "bold",
  },
  customerValue: {
    fontSize: 10,
    color: "#333",
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  addressBox: {
    width: "48%",
  },
  tableContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
    padding: 2,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
  },
  tableColHeader: {
    padding: 4,
    backgroundColor: "#8B4513",
    color: "white",
    fontWeight: "bold",
    borderWidth: 1,
    fontSize: 9,
  },
  tableCol: {
    padding: 6,
    borderWidth: 1,
    fontSize: 9,
  },
  colSno: { width: "5%" },
  colProduct: { width: "23%" },
  colQty: { width: "7%" },
  colSize: { width: "11%" },
  colPrice: { width: "12%" },
  colTaxable: { width: "13%" },
  colGST: { width: "8%" },
  colGSTValue: {width:"10%"},
  colTotal: { width: "13%" },
  gstSummaryBox: {
    marginTop: 15,
    alignSelf: "flex-end",
    width: "50%",
    borderWidth: 1,
    borderColor: "#e0c9b0",
    borderRadius: 5,
  },
  gstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff8f3",
  },
  gstLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#555",
  },
  gstValue: {
    fontSize: 10,
    color: "#333",
    fontWeight: "bold",
  },
  gstDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0c9b0",
    marginLeft: 10,
    marginRight: 10,
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#8B4513",
    padding: 8,
  },
  // paidBadge: {
  //   borderWidth: 2,
  //   borderColor: "green",
  //   borderStyle: "solid",
  //   borderRadius: 4,
  //   paddingTop: 6,
  //   paddingBottom: 6,
  //   paddingLeft: 16,
  //   paddingRight: 16,
  //   alignSelf: "flex-start",
  //   marginTop: 10,
  //   backgroundColor: "#f0fff0",
  // },
  // paidText: {
  //   color: "green",
  //   fontSize: 14,
  //   fontWeight: "bold",
  // },

  paidStamp: {
    alignSelf: "flex-start",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#2e7d32",
    borderStyle: "solid",
    borderRadius: 2,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#e8f5e9",
    transform: "rotate(-15deg)",
  },
  paidStampText: {
    color: "#2e7d32",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 3,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    borderTopWidth: 1,
    borderTopColor: "#8B4513",
    paddingTop: 6,
    textAlign: "center",
    fontSize: 9,
    color: "#666",
  },
  footerText:{
    textAlign:"center",
    fontSize:9,
    color:"#666",
  }
});

const InvoicePDF = ({ data }) => {
  const items = data?.items || [];
  const invoiceNumber = data?.invoiceNo || "";
  const currentDate = data?.invoiceDate || "";
  const customerName = data?.customerName || "";
  const customerPhone = data?.customerPhone || "";
  const billingAddress = data?.billingAddress || "";
  const shippingAddress = data?.shippingAddress || "";
  const subTotal = data?.subTotal || 0;
  const taxAmount = data?.taxAmount || 0;
  const total = data?.totalAmount || 0;

  const getState = (address) => {
    if (!address) return "";
    const parts = address.split(",");
    const statePincode = parts[5] || "";
    return statePincode.split("-")[0]?.trim();
  };

  const billingState = getState(data?.billingAddress);
  const shippingState = getState(data?.shippingAddress);
  const isSameState = billingState === shippingState;

  const ITEMS_PER_PAGE = 7;

  // Split items into pages: [[item1..item7], [item8..item14], ...]
  const pages = [];
  for (let i = 0; i < items.length; i += ITEMS_PER_PAGE) {
    pages.push(items.slice(i, i + ITEMS_PER_PAGE));
  }

  // Edge case: if no items, still show one empty page
  if (pages.length === 0) pages.push([]);

  return (
    <Document>
      {pages.map((pageItems, pageIndex) => {
        const isFirstPage = pageIndex === 0;
        const isLastPage = pageIndex === pages.length - 1;
        return (
          <Page size="A4" style={styles.page} key={pageIndex}>
            {/* Header */}
            {isFirstPage && (
              <>
                <View style={styles.header}>
                  <Text style={styles.headerText}>
                    SPICE HARVEST - TAX INVOICE
                  </Text>
                </View>

                {/* Logo + Invoice Info */}
                <View style={styles.headerRow}>
                  <Image src={logo2} style={{ width: 130 }} />
                  <View style={{ textAlign: "right" }}>
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>Invoice No:</Text>{" "}
                      {invoiceNumber}
                    </Text>
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>Date:</Text>{" "}
                      {currentDate}
                    </Text>
                  </View>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Customer Details */}
                <View style={styles.customerCard}>
                  <Text style={styles.sectionTitle}>Customer Details</Text>
                  <View style={styles.customerRow}>
                    <View style={styles.customerField}>
                      <Text style={styles.customerLabel}>Name</Text>
                      <Text style={styles.customerValue}>{customerName}</Text>
                    </View>
                    <View style={styles.customerField}>
                      <Text style={styles.customerLabel}>Phone</Text>
                      <Text style={styles.customerValue}>{customerPhone}</Text>
                    </View>
                    <View style={styles.customerField}>
                      <Text style={styles.customerLabel}>GSTIN</Text>
                      <Text style={styles.customerValue}>29ABCDE1JJKDS</Text>
                    </View>
                  </View>
                </View>

                {/* Billing + Shipping */}
                {/* Billing + Shipping */}
                <View style={styles.addressRow}>
                  <View style={styles.addressBox}>
                    <Text style={styles.sectionTitle}>Billing Address</Text>
                    {(() => {
                      const p = billingAddress.split(",").map((s) => s.trim());
                      // p[0]=name, p[1]=phone, p[2]=line1, p[3]=line2, p[4]=city, p[5]=state-pin, p[6]=country
                      return (
                        <>
                          <Text>{p[0]}</Text>
                          <Text>
                            {p[2]}, {p[3]}
                          </Text>
                          <Text>
                            {p[4]}, {p[5]}
                          </Text>
                          <Text>{p[6]}</Text>
                          <Text>{p[1]}</Text>
                        </>
                      );
                    })()}
                  </View>

                  <View style={styles.addressBox}>
                    <Text style={styles.sectionTitle}>Shipping Address</Text>
                    {(() => {
                      const p = shippingAddress.split(",").map((s) => s.trim());
                      return (
                        <>
                          <Text>{p[0]}</Text>
                          <Text>
                            {p[2]}, {p[3]}
                          </Text>
                          <Text>
                            {p[4]}, {p[5]}
                          </Text>
                          <Text>{p[6]}</Text>
                          <Text>{p[1]}</Text>
                        </>
                      );
                    })()}
                  </View>
                </View>
              </>
            )}

            {/* Invoice Table */}
            <View style={styles.tableContainer}>
              <View style={styles.table}>
                {/* <View style={styles.tableRow} wrap={false}>
              <Text style={[styles.tableColHeader,styles.colSno]}>S.NO</Text>
              <Text style={[styles.tableColHeader,styles.colProduct]}>Products</Text>
              <Text style={[styles.tableColHeader,styles.colQty]}>Quantity</Text>
              <Text style={[styles.tableColHeader,styles.colSize]}>Size</Text>
              <Text style={[styles.tableColHeader,styles.colPrice]}>Unit Price</Text>
              <Text style={[styles.tableColHeader,styles.colTaxable]}>Taxable Value</Text>
              {isSameState ? (
                <>
                  <Text style={[styles.tableColHeader,styles.colGST]}>CGST</Text>
                  <Text style={[styles.tableColHeader,styles.colGST]}>SGST</Text>
                </>
              ) : (
                <Text style={[styles.tableColHeader,styles.colGST]}>IGST</Text>
              )}
              <Text style={[styles.tableColHeader,styles.colTotal]}>Total</Text>
            </View> */}
                {/* Header Row */}
                <View style={styles.tableRow}>
                  <Text style={[styles.tableColHeader, styles.colSno]}>
                    S.NO
                  </Text>
                  <Text style={[styles.tableColHeader, styles.colProduct]}>
                    Products
                  </Text>
                  <Text style={[styles.tableColHeader, styles.colQty]}>
                    Qty
                  </Text>{" "}
                  {/* shortened! */}
                  <Text style={[styles.tableColHeader, styles.colSize]}>
                    Size
                  </Text>
                  <Text style={[styles.tableColHeader, styles.colPrice]}>
                    Unit Price
                  </Text>
                  <Text style={[styles.tableColHeader, styles.colTaxable]}>
                    Taxable Val
                  </Text>
                  {/* {isSameState ? (
                    <>
                      <Text style={[styles.tableColHeader, styles.colGST]}>
                        CGST
                      </Text>
                      <Text style={[styles.tableColHeader, styles.colGST]}>
                        SGST
                      </Text>
                    </>
                  ) : (
                    <Text style={[styles.tableColHeader, styles.colGST]}>
                      IGST
                    </Text>
                  )} */}
                  <Text style={[styles.tableColHeader, styles.colGST]}>
                    GST %
                  </Text>
                  <Text style={[styles.tableColHeader, styles.colGST]}>
                    GST Value
                  </Text>
                  <Text style={[styles.tableColHeader, styles.colTotal]}>
                    Total
                  </Text>
                </View>

                {/* Data Rows — add col width styles here too! */}
                {pageItems.map((item, index) => {
                  const serialNo = pageIndex * ITEMS_PER_PAGE + index + 1;
                  return (
                    <View
                      style={[
                        styles.tableRow,
                        index % 2 === 1 && { backgroundColor: "#fff8f3" },
                      ]}
                      key={index}
                    >
                      <Text style={[styles.tableCol, styles.colSno]}>
                        {serialNo}
                      </Text>
                      <Text style={[styles.tableCol, styles.colProduct]}>
                        {item.productName}
                      </Text>
                      <Text style={[styles.tableCol, styles.colQty]}>
                        {item.quantity}
                      </Text>
                      <Text style={[styles.tableCol, styles.colSize]}>
                        {item.size}
                      </Text>
                      <Text style={[styles.tableCol, styles.colPrice]}>
                        ₹{item.unitPrice.toFixed(2)}
                      </Text>
                      <Text style={[styles.tableCol, styles.colTaxable]}>
                        ₹{(item.unitPrice * item.quantity).toFixed(2)}
                      </Text>
                      {/* {isSameState ? (
                        <>
                          <Text style={[styles.tableCol, styles.colGST]}>
                            ₹{(item.taxAmount / 2).toFixed(2)}
                          </Text>
                          <Text style={[styles.tableCol, styles.colGST]}>
                            ₹{(item.taxAmount / 2).toFixed(2)}
                          </Text>
                        </>
                      ) : (
                        <Text style={[styles.tableCol, styles.colGST]}>
                          ₹{item.taxAmount.toFixed(2)}
                        </Text>
                      )} */}
                      <Text style={[styles.tableCol, styles.colGST]}>
                        {item.taxPercent}
                      </Text>
                      <Text style={[styles.tableCol, styles.colGST]}>
                        {item.taxAmount}
                      </Text>
                      <Text style={[styles.tableCol, styles.colTotal]}>
                        ₹{item.total.toFixed(2)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* GST Summary */}
            {isLastPage && (
              <>
                <View style={styles.gstSummaryBox}>
                  <View style={styles.gstRow}>
                    <Text style={styles.gstLabel}>Taxable Value</Text>
                    <Text style={styles.gstValue}>
                      {"\u20B9"}
                      {subTotal}
                    </Text>
                  </View>
                  {isSameState ? (
                    <>
                      <View style={styles.gstRow}>
                        <Text style={styles.gstLabel}>CGST(2.5%)</Text>
                        <Text style={styles.gstValue}>
                          {"\u20B9"}
                          {(taxAmount / 2).toFixed(2)}
                        </Text>
                      </View>
                      <View style={styles.gstRow}>
                        <Text style={styles.gstLabel}>SGST(2.5%)</Text>
                        <Text style={styles.gstValue}>
                          {"\u20B9"}
                          {(taxAmount / 2).toFixed(2)}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View style={styles.gstRow}>
                      <Text style={styles.gstLabel}>IGST</Text>
                      <Text style={styles.gstValue}>
                        {"\u20B9"}
                        {taxAmount.toFixed(2)}
                      </Text>
                    </View>
                  )}
                  <View style={styles.gstDivider} />
                  <View style={styles.gstRow}>
                    <Text style={styles.gstLabel}>Total GST</Text>
                    <Text style={styles.gstValue}>
                      {"\u20B9"}
                      {taxAmount.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.grandTotalRow}>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 11,
                      }}
                    >
                      Grand Total
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 11,
                      }}
                    >
                      {"\u20B9"}
                      {total}
                    </Text>
                  </View>
                </View>

                {/* Paid Badge */}
                <View style={styles.paidStamp}>
                  <Text style={styles.paidStampText}>✔ PAID</Text>
                </View>
              </>
            )}

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Thank you for shopping with Spice Harvest!</Text>
              <Text style={styles.footerText}>support@spiceharvest.com | +91 98765 43210</Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default InvoicePDF;
