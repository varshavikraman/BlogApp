import { StyleSheet, Platform } from "react-native";

export const BlogEditorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  form: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 16,
  },
  
  // Screen Header
  screenHeader: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 8,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
    marginTop: 12,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
  },
  
  // Input Cards
  inputCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginLeft: 8,
  },
  input: {
    fontSize: 16,
    color: "#334155",
    padding: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  excerptInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  charHint: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 6,
    fontStyle: "italic",
  },
  
  // Content Area
  contentContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  textarea: {
    fontSize: 16,
    color: "#334155",
    padding: 16,
    minHeight: 200,
    textAlignVertical: "top",
  },
  contentFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  charCount: {
    fontSize: 14,
    color: "#64748B",
    marginLeft: 6,
  },
  
  // Footer Buttons
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  draftButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#F5F3FF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },
  draftText: {
    color: "#7C3AED",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  publishButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 12,
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  publishButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  publishText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  
  // Other
  bottomSpacer: {
    height: 100,
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 100,
  },
  statusCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  draftBadge: {
    backgroundColor: "#FEF3C7",
  },
  publishedBadge: {
    backgroundColor: "#D1FAE5",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 6,
  },
  draftStatusText: {
    color: "#D97706",
  },
  publishedStatusText: {
    color: "#059669",
  },
  statusHint: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
  },
});