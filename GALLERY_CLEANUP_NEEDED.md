# 🔧 Gallery.tsx Cleanup Needed

## Problem
The Gallery.tsx file has a mix of old mock data code and new backend integration code, causing errors.

## Solution: Clean File Approach

The Gallery file needs to be cleaned up. Here's what to do:

### Option 1: Find and Replace in Gallery.tsx

Search for these and remove/comment out:
1. All references to `allArtworks` (old mock data)
2. All references to `filteredArtworks` (old filtering logic)
3. All references to `displayedArtworks` (old display logic)
4. Variables: `theme`, `format`, `color`, `interior`, `selectedCategories`, `itemsToShow`, `setIsLoading`

### Option 2: Use displayProducts Directly

In the JSX where products are rendered, replace:
```typescript
// OLD:
{displayedArtworks.map((artwork) => (
  <ArtworkCard {...artwork} />
))}

// NEW:
{isLoading ? (
  <ArtworkGridSkeleton />
) : (
  displayProducts.map((artwork, index) => (
    <ArtworkCard
      key={artwork.id}
      {...artwork}
      index={index}
    />
  ))
)}
```

### Option 3: Add Pagination UI

After the product grid, add:
```typescript
{/* Pagination */}
{!isLoading && totalPages > 1 && (
  <div className="flex items-center justify-center gap-2 mt-8">
    <Button
      onClick={() => setPage(p => Math.max(0, p - 1))}
      disabled={page === 0}
      variant="outline"
    >
      <ChevronLeft className="h-4 w-4" />
      Previous
    </Button>
    
    <span className="text-sm">
      Page {page + 1} of {totalPages} ({totalElements} products)
    </span>
    
    <Button
      onClick={() => setPage(p => p + 1)}
      disabled={page >= totalPages - 1}
      variant="outline"
    >
      Next
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
)}
```

---

## Quick Fix: What's Working

The TOP of Gallery.tsx (lines 1-110) has the correct backend integration:
- ✅ Real data fetching
- ✅ Search with debounce
- ✅ Category filtering
- ✅ Pagination state
- ✅ Product conversion function
- ✅ `displayProducts` array ready to use

## What to Remove

Everything after line 110 that references:
- `allArtworks`
- `filteredArtworks`
- `displayedArtworks`  
- Old filtering logic
- Old mock data

---

## Simplest Solution

1. Find where products are rendered in the JSX (search for `.map((artwork`)
2. Replace with: `displayProducts.map((artwork, index) => (`
3. Wrap in loading check: `{isLoading ? <ArtworkGridSkeleton /> : displayProducts.map(...)}`
4. Add pagination buttons after the grid

The backend integration is DONE. Just need to clean up the old UI code!
