# AI-Based ID & Age Verifier

A comprehensive full-stack web application for verifying identity and age using simulated AI-powered OCR and face matching technology. Built with Next.js 15, this app demonstrates modern web development practices for identity verification systems.

## 🚀 Features

### Core Functionality
- **Document Upload**: Support for Aadhar card images (JPG, PNG) and PDFs
- **Live Selfie Capture**: Webcam integration with real-time quality feedback
- **OCR Text Extraction**: Simulated extraction of DOB and personal information
- **Face Matching**: AI-powered face comparison between ID and selfie
- **Age Verification**: Automatic age calculation and 18+ verification
- **Real-time Feedback**: Live image quality assessment (lighting, blur, face detection)

### User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: System-aware theme switching
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Loading States**: Smooth animations and progress indicators

### Security & Privacy
- **Secure Processing**: All data processed in memory, no permanent storage
- **Data Masking**: Sensitive information like Aadhar numbers are masked
- **HTTPS Ready**: Secure communication protocols
- **Privacy First**: Clear privacy notices and data handling transparency

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern UI component library
- **Lucide React**: Beautiful icons

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Simulated AI Services**: 
  - OCR text extraction simulation
  - Face matching algorithm simulation
  - Real-time image quality analysis

### Key Libraries
- **next-themes**: Dark mode support
- **@radix-ui**: Accessible UI primitives
- **WebRTC**: Camera access and media capture

## 📁 Project Structure

\`\`\`
age-identity-verifier/
├── app/
│   ├── api/verify/route.ts          # Verification API endpoint
│   ├── components/
│   │   ├── file-upload.tsx          # Drag & drop file upload
│   │   ├── webcam-capture.tsx       # Camera integration
│   │   └── verification-results.tsx # Results display
│   ├── layout.tsx                   # Root layout with metadata
│   └── page.tsx                     # Main application page
├── components/
│   ├── ui/                          # shadcn/ui components
│   └── theme-provider.tsx           # Theme context provider
├── lib/
│   └── utils.ts                     # Utility functions
└── public/                          # Static assets
\`\`\`

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd age-identity-verifier
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🎯 Usage Guide

### Step 1: Upload Aadhar Card
- Drag and drop your Aadhar card image or PDF
- Supported formats: JPG, PNG, PDF (max 10MB)
- Preview will show the uploaded document

### Step 2: Capture Selfie
- Click "Start Camera" to access your webcam
- Position your face within the frame overlay
- Real-time feedback will guide you:
  - ✅ Good lighting
  - ✅ Face detected
  - ✅ Low blur
- Click "Capture Photo" when all indicators are green
- Alternative: Upload a photo file instead

### Step 3: Verify Identity
- Click "Verify Identity & Age" to start processing
- The system will:
  - Extract text from your Aadhar card using OCR
  - Calculate your age from the date of birth
  - Compare faces using AI matching
  - Generate a confidence score

### Step 4: View Results
- See detailed verification results including:
  - Extracted personal information
  - Age verification status (18+)
  - Face match confidence percentage
  - Side-by-side image comparison
- Download verification report (JSON format)

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for production configurations:

\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_MAX_FILE_SIZE=10485760

# Security
NEXT_PUBLIC_ENABLE_ANALYTICS=false
\`\`\`

### Customization Options

#### Verification Thresholds
Modify in `app/api/verify/route.ts`:
\`\`\`typescript
const FACE_MATCH_THRESHOLD = 80 // Minimum confidence %
const MINIMUM_AGE = 18 // Age requirement
\`\`\`

#### UI Themes
Customize colors in `tailwind.config.ts`:
\`\`\`typescript
theme: {
  extend: {
    colors: {
      primary: "your-primary-color",
      secondary: "your-secondary-color"
    }
  }
}
\`\`\`

## 🧪 Testing

### Manual Testing Scenarios

1. **Valid Adult Verification**
   - Upload clear Aadhar with DOB showing 18+ age
   - Take clear, well-lit selfie
   - Expected: ✅ Verified status

2. **Minor Age Test**
   - Upload Aadhar with DOB showing under 18
   - Expected: ❌ Age verification failed

3. **Poor Image Quality**
   - Upload blurry or dark images
   - Expected: Low confidence score, verification failed

4. **Face Mismatch**
   - Upload different person's images
   - Expected: Low face match confidence

### Automated Testing
\`\`\`bash
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
npm run lint        # Code quality checks
\`\`\`

## 🔒 Security Considerations

### Data Protection
- All processing happens in server memory
- No permanent storage of personal data
- Automatic cleanup of temporary files
- Masked display of sensitive information

### Production Deployment
- Enable HTTPS/SSL certificates
- Implement rate limiting for API endpoints
- Add CSRF protection for forms
- Use environment variables for sensitive configs
- Enable security headers in Next.js config

### Privacy Compliance
- Clear privacy policy and data usage notices
- User consent for camera access
- Data retention policy (immediate deletion)
- GDPR/CCPA compliance considerations

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

### Other Platforms
- **Netlify**: Configure build settings for Next.js
- **AWS Amplify**: Use Next.js build configuration
- **Docker**: Use the included Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review common troubleshooting scenarios

## 🔮 Future Enhancements

- [ ] Real OCR integration with Tesseract.js
- [ ] Actual face matching with TensorFlow.js
- [ ] Multi-language support for OCR
- [ ] Blockchain-based verification certificates
- [ ] Integration with government ID databases
- [ ] Mobile app version with React Native
- [ ] Advanced fraud detection algorithms
- [ ] Biometric liveness detection

---

**Note**: This is a demonstration application with simulated AI capabilities. For production use, integrate with real OCR and face matching services, implement proper security measures, and ensure compliance with local regulations.
