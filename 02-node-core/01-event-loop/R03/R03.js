function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

async function example() {
    console.log("before");
    await sleep(2000);
    console.log("after 2 seconds");
}

example().catch((error) => {
    console.log("unexpected error:", error);
    process.exit(1);
});