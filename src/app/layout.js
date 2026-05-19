import './globals.css';

export const metadata = {
  title: 'AdVantage | Premium Outdoor Advertising Marketplace',
  description: 'Discover, design, and book premium outdoor billboards with 3D live previews, real-time traffic analytics, and custom Canva-style poster editors.',
  keywords: 'billboard marketplace, outdoor advertising, hoarding booking, 3D billboard preview, traffic analytics advertising, print outdoor media, local business advertising',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>" />
      </head>
      <body>
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
          <div className="glow-bg glow-purple" style={{ top: '-10%', left: '-10%' }}></div>
          <div className="glow-bg glow-cyan" style={{ bottom: '-5%', right: '-5%' }}></div>
        </div>
        {children}
      </body>
    </html>
  );
}
