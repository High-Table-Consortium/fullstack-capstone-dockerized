import { Skeleton } from "../components/ui/skeleton"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import Navbar from './Navbar'
import FooterComponent from './Footer'

export default function DestinationDetailSkeleton() {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-8 px-4 space-y-8">
                {/* Header Section */}
                <div className="relative h-[50vh] md:h-[70vh] w-full ">
                    <Skeleton className="absolute inset-0 h-full w-full" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                        <Skeleton className="h-12 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    <div className="absolute top-4 right-4">
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                </div>

                {/* Destination Information Section */}
                <Card className="shadow-lg p-6 rounded-lg border border-gray-200 w-full">
                    <CardHeader>
                        <Skeleton className="h-6 w-1/3" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="space-y-2">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                    <Skeleton className="h-3 w-3 rounded-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Details Section */}
                <Card className="shadow-lg p-6 rounded-lg border border-gray-200 w-full">
                    <CardContent className="space-y-4">
                        <Skeleton className="h-6 w-1/3" />
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-6 w-6" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-6 w-6" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-6 w-6" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-10 w-40" />
                    </CardContent>
                </Card>

                {/* Nearby Restaurants Section */}
                <div>
                    <Skeleton className="h-8 w-1/3 mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, index) => (
                            <Card key={index}>
                                <CardContent className="p-0">
                                    <Skeleton className="w-full h-48" />
                                </CardContent>
                                <CardContent className="space-y-2 p-4">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    {[...Array(3)].map((_, subIndex) => (
                                        <div key={subIndex} className="flex items-center">
                                            <Skeleton className="h-4 w-4 mr-2" />
                                            <Skeleton className="h-4 w-5/6" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Review Section */}
                <div className="space-y-4">
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="space-y-4">
                        {[...Array(2)].map((_, index) => (
                            <Card key={index}>
                                <CardContent className="p-4">
                                    <div className="flex items-start space-x-4">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-4 w-1/4" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-5/6" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    )
}
