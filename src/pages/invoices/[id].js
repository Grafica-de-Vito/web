import { useRouter } from "next/router";

function Invoice() {
    const router = useRouter();
    const { id } = router.query;
  
    return <p>Invoice: {id}</p>
}

export default Invoice;