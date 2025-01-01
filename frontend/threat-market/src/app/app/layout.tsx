import MyAppBar from "../../components/MyAppBar"
export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <MyAppBar />
                <main style={{ paddingLeft: 100, paddingRight: 100 }}>{children}</main>
            </body>
        </html>
    )
}