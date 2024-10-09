import { Skeleton } from "../components/ui/skeleton"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import Navbar from './Navbar'

export default function DestinationDetailSkeleton() {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-8 px-4 space-y-8">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardContent className="p-0">
                            <Skeleton className="w-full h-64" />
                        </CardContent>
                        <CardContent className="space-y-4 p-6">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="flex items-center">
                                    <Skeleton className="h-4 w-4 mr-2" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {[...Array(3)].map((_, index) => (
                                    <li key={index} className="flex items-center">
                                        <Skeleton className="h-2 w-2 rounded-full mr-2" />
                                        <Skeleton className="h-4 w-5/6" />
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Skeleton className="h-10 w-40" />
                </div>

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
        </div>
    )
}