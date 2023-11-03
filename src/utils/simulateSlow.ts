/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

export default function simulateSlow(timeout: number = 1) {
    //simulate slow
    let startTime = performance.now()
    while (performance.now() - startTime < timeout) {
        // Do nothing for 1 ms per item to emulate extremely slow code
    }
}