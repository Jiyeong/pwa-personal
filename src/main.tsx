import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { LanguageProvider } from "@/contexts/LanguageContext"
import { InAppBrowserRedirect } from "@/components/InAppBrowserRedirect"

import "./index.css"
// main.tsx : 애플리케이션의 진입점
// 앱의 최상위 래퍼 컴포넌트
function Providers({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const delay = async () => {
			await new Promise(resolve => setTimeout(resolve, 5000)); // 2초 지연
		};
		delay();
	}, []);

	return (
			<StrictMode>
				<LanguageProvider>
					<InAppBrowserRedirect />
					{children}
				</LanguageProvider>
			</StrictMode>
	)
}

createRoot(document.getElementById('root')!).render(
		<Providers>
			<RouterProvider router={router} />
		</Providers>
)
