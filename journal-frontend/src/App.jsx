import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { pdfjs } from "react-pdf";
// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import TopNavbar from "./components/TopNavbar";
import AuthorDashboard from "./pages/author/AuthorDashboard";
import ReviewerDashboard from "./pages/reviewer/ReviewerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/Login";
import SubmitPaper from "./pages/author/SubmitPaper";
import AIAnalysis from "./pages/AIAnalysis";
import ReviewPaper from "./pages/reviewer/ReviewPaper";
import Comparison from "./pages/admin/Comparison";
import Submissions from "./pages/admin/Submissions";
import PublishedPaper from "./pages/published/PublishedPaper";
import AssignedPapers from "./pages/reviewer/AssignedPapers";
import PublishIssues from "./pages/admin/PublishIssues";
import GoogleSuccess from "./pages/GoogleSuccess";
import PDFViewer from "./pages/shared/PDFViewer";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function App() {
  return (
    <BrowserRouter>
      <TopNavbar />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        {/*TopNavbar*/}

        {/* Signup Route */}
        <Route path="/signup" element={<Signup />} />

        {/* <Route path="/published" element={<PublishedPaper />} /> */}
        <Route path="/admin/published" element={<PublishedPaper />} />
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Author Route */}
        <Route
          path="/author"
          element={
            <ProtectedRoute allowedRole="author">
              <AuthorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pdf-viewer"
          element={
            <ProtectedRoute allowedRoles={["admin", "reviewer"]}>
              <PDFViewer />
            </ProtectedRoute>
          }
        />

        {/* Protected Reviewer Route */}
        <Route
          path="/reviewer"
          element={
            <ProtectedRoute allowedRole="reviewer">
              <ReviewerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/issues" element={<PublishIssues />} />

        <Route
          path="/author/submit"
          element={
            <ProtectedRoute allowedRole="author">
              <SubmitPaper />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-analysis"
          element={
            <ProtectedRoute allowedRole="author">
              <AIAnalysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviewer/review/:id"
          element={
            <ProtectedRoute allowedRole="reviewer">
              <ReviewPaper />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/comparison"
          element={
            <ProtectedRoute allowedRole="admin">
              <Comparison />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/submissions"
          element={
            <ProtectedRoute allowedRole="admin">
              <Submissions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reviewer/papers"
          element={
            <ProtectedRoute allowedRole="reviewer">
              <AssignedPapers />
            </ProtectedRoute>
          }
        />

        <Route path="/google-success" element={<GoogleSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
