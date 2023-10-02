export async function getMarker(markerRetreived) {
    var marker = [];
  

    //TODO: create in Firebase firestore
    
    var snapshot = await firebase.firestore()
      .collection('Events')
      .orderBy('createdAt')
      .get()
  
    snapshot.forEach((doc) => {
      const markerItem = doc.data();
      markerItem.id = doc.id;
      marker.push(markerItem);
    });
  
     markerRetreived(marker);
  }