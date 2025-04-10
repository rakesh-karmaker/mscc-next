import Activities from "@/components/activitiesComponents/activities"

export default async function ActivitiesPage({searchParams}: {
    searchParams: Promise<{tag?: string}>
}) {
    const {tag} = await (searchParams)
    
    return (
        <Activities linkTag={tag} />
    )
}