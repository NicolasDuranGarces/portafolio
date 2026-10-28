/** IntersectionObserver double: tests decide when and what an observer reports. */
export class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = []

  readonly root = null
  readonly rootMargin: string
  readonly thresholds: readonly number[] = []
  observed = new Set<Element>()

  constructor(
    private readonly callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.rootMargin = options?.rootMargin ?? '0px'
    MockIntersectionObserver.instances.push(this)
  }

  observe(target: Element) {
    this.observed.add(target)
  }
  unobserve(target: Element) {
    this.observed.delete(target)
  }
  disconnect() {
    this.observed.clear()
  }
  takeRecords() {
    return []
  }

  /** Reports several targets in one callback, as the browser batches them after a scroll. */
  reportAll(entries: { target: Element; isIntersecting: boolean; top?: number; rootBottom?: number }[]) {
    this.callback(
      entries.map(
        (entry) =>
          ({
            target: entry.target,
            isIntersecting: entry.isIntersecting,
            boundingClientRect: { top: entry.top ?? 0 } as DOMRectReadOnly,
            rootBounds: { bottom: entry.rootBottom ?? 600 } as DOMRectReadOnly,
          }) as IntersectionObserverEntry,
      ),
      this,
    )
  }

  report(target: Element, entry: { isIntersecting: boolean; top?: number; rootBottom?: number }) {
    this.reportAll([{ target, ...entry }])
  }

  static reset() {
    MockIntersectionObserver.instances = []
  }

  /** Observers that currently watch the given element. */
  static watching(target: Element) {
    return MockIntersectionObserver.instances.filter((observer) => observer.observed.has(target))
  }
}
