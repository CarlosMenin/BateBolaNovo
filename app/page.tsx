import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // Sorting listings by date
  const sortedListings = listings.sort((a, b) => {
    const dateA = new Date(a.data);
    const timeA = new Date(a.horario);
    const dateTimeA = new Date(dateA.toDateString() + ' ' + timeA.toTimeString());

    const dateB = new Date(b.data);
    const timeB = new Date(b.horario);
    const dateTimeB = new Date(dateB.toDateString() + ' ' + timeB.toTimeString());

    return dateTimeA.getTime() - dateTimeB.getTime(); // Ascending order
  });

  if (listings.length == 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        ">
          {sortedListings.map((listing) => {
            //Pular eventos que já ocorreram
            const eventDate = new Date(listing.data);
            const eventTime = new Date(listing.horario);
            const combinedEventDateTime = new Date(eventDate.toDateString() + ' ' + eventTime.toTimeString());

            const currentDate = new Date();
            if (combinedEventDateTime < currentDate) {
              return null;
            }
            //Mostrar eventos ainda disponíveis
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;
