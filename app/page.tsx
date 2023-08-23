import React from 'react';
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import getUserById from './actions/getUserBlock';

interface HomeProps {
  searchParams: IListingsParams;
}

const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  const sortedListings = [];

  for (const listing of listings) {
    const eventDate = new Date(listing.data);
    const eventTime = new Date(listing.horario);
    const combinedEventDateTime = new Date(eventDate.toDateString() + ' ' + eventTime.toTimeString());
    const currentDate = new Date();

    if (combinedEventDateTime < currentDate) {
      continue; // Pula eventos passados
    }

    let isBlocked = false;

    if (currentUser && currentUser.blockedUsers) {
      isBlocked = currentUser.blockedUsers.includes(listing.userId);
    }

    if (!isBlocked && currentUser) {
      const userBlockedUsers = await getUserById({ id: listing.userId });

      if (userBlockedUsers && userBlockedUsers.includes(currentUser.id)) {
        isBlocked = true;
      }
    }

    if (!isBlocked) {
      sortedListings.push(listing);
    }
  }

  const sortedAndFilteredEvents = sortedListings.sort((a, b) => {
    const dateA = new Date(a.data);
    const timeA = new Date(a.horario);
    const dateTimeA = new Date(dateA.toDateString() + ' ' + timeA.toTimeString());

    const dateB = new Date(b.data);
    const timeB = new Date(b.horario);
    const dateTimeB = new Date(dateB.toDateString() + ' ' + timeB.toTimeString());

    return dateTimeA.getTime() - dateTimeB.getTime(); // Ascending order
  });

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
          {sortedAndFilteredEvents.length === 0 ? (
            <EmptyState showReset />
          ) : (
            sortedAndFilteredEvents.map((listing) => (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            ))
          )}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
