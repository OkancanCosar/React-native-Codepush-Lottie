import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const GStyles = StyleSheet.create({
  container: { flex: 1 },
  rowContainer: { flexDirection: "row", paddingHorizontal: 10, marginVertical: 2 },

  // Tablo view için
  tableContainer: { flex: 1, marginVertical: 10, marginHorizontal: 20, justifyContent: "center", alignItems: "center" },
  tableRow: { flex: 1, flexDirection: "row", borderColor: "#f7f7f7", borderWidth: 0.8 },
  tableCell: { flex: 1, borderColor: "#f7f7f7", padding: 5, borderWidth: 0.8 },
  tableCell2: { flex: 2, borderColor: "#f7f7f7", padding: 5, borderWidth: 0.8 },

  TA_C: { textAlign: "center" },

  M_5: { margin: 5 },
  M_10: { margin: 10 },
  M_15: { margin: 15 },
  M_20: { margin: 20 },
  M_25: { margin: 25 },
  M_30: { margin: 30 },

  MT_5: { marginTop: 5 },
  MT_10: { marginTop: 10 },
  MT_15: { marginTop: 15 },
  MT_20: { marginTop: 20 },
  MT_25: { marginTop: 25 },
  MT_30: { marginTop: 30 },

  MB_5: { marginBottom: 5 },
  MB_10: { marginBottom: 10 },
  MB_15: { marginBottom: 15 },
  MB_20: { marginBottom: 20 },
  MB_25: { marginBottom: 25 },
  MB_30: { marginBottom: 30 },

  ML_5: { marginLeft: 5 },
  ML_10: { marginLeft: 10 },
  ML_15: { marginLeft: 15 },
  ML_20: { marginLeft: 20 },
  ML_25: { marginLeft: 25 },
  ML_30: { marginLeft: 30 },

  MR_5: { marginRight: 5 },
  MR_10: { marginRight: 10 },
  MR_15: { marginRight: 15 },
  MR_20: { marginRight: 20 },
  MR_25: { marginRight: 25 },
  MR_30: { marginRight: 30 },

  P_5: { padding: 5 },
  P_10: { padding: 10 },
  P_15: { padding: 15 },
  P_20: { padding: 20 },
  P_25: { padding: 25 },
  P_30: { padding: 30 },

  PT_5: { paddingTop: 5 },
  PT_10: { paddingTop: 10 },
  PT_15: { paddingTop: 15 },
  PT_20: { paddingTop: 20 },
  PT_25: { paddingTop: 25 },
  PT_30: { paddingTop: 30 },

  PB_5: { paddingBottom: 5 },
  PB_10: { paddingBottom: 10 },
  PB_15: { paddingBottom: 15 },
  PB_20: { paddingBottom: 20 },
  PB_25: { paddingBottom: 25 },
  PB_30: { paddingBottom: 30 },

  PL_5: { paddingLeft: 5 },
  PL_10: { paddingLeft: 10 },
  PL_15: { paddingLeft: 15 },
  PL_20: { paddingLeft: 20 },
  PL_25: { paddingLeft: 25 },
  PL_30: { paddingLeft: 30 },

  PR_5: { paddingRight: 5 },
  PR_10: { paddingRight: 10 },
  PR_15: { paddingRight: 15 },
  PR_20: { paddingRight: 20 },
  PR_25: { paddingRight: 25 },
  PR_30: { paddingRight: 30 },
});

export { GStyles, height, width };
