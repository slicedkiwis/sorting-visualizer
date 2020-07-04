//animation delay function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
//utility swap function for all algorithms
async function swap(array, l, r) {
  array[l].color = pivotColor;
  array[r].color = pivotColor;
  await sleep(4);
  let temp = array[l].x;
  array[l].x = array[r].x;
  array[r].x = temp;
  array[l].color = barColor;
  array[r].color = barColor;
  await sleep(4);
  //
  temp = array[l];
  array[l] = array[r];
  array[r] = temp;
}
async function quickSort(left, right) {
  if (left < right) {
    let pivot = await partition(arrayOfBars, left, right);
    await Promise.all([
      quickSort(left, pivot - 1),
      quickSort(pivot + 1, right),
    ]);
    await sleep(animationMergeSpeed / 2);
  } else return;
}
async function partition(array, left, right) {
  // checks if the array is already swapped (if its already swapped and we call quicksort it would take ( O(n^2) time)
  let i = 0;
  for (i = 1; i < array.length; i++) {
    if (array[i].height < array[i - 1].height) break;
  }
  if (i >= arrayOfBars.length) {
    return;
  }
  let pivot = left;
  arrayOfBars[left].color = tertiaryColor;
  arrayOfBars[right].color = tertiaryColor;
  let l = left;
  while (left < right && right < arrayOfBars.length) {
    arrayOfBars[pivot].color = pivotColor;
    arrayOfBars[left].color = secondaryColor;
    await sleep(animationMergeSpeed);
    if (array[left].height < array[right].height) {
      swap(array, left, pivot++);
      await sleep(animationMergeSpeed);
    }
    left++;
  }
  await swap(array, right, pivot);
  for (l; l <= right && right < arrayOfBars.length; l++) {
    await sleep(10);
    arrayOfBars[l].color = barColor;
  }
  return pivot;
}
async function mergeSort(left, right) {
  if (left < right) {
    let mid = parseInt(left + (right - left) / 2);
    await Promise.all([mergeSort(left, mid), mergeSort(mid + 1, right)]);
    await sleep(animationMergeSpeed + 200);
    await merge(left, mid, right);
  } else return;
}
async function merge(left, mid, right) {
  let temp = [];
  async function mergeInner(left, mid, right) {
    let l = left,
      m = mid + 1;
    while (l <= mid && m <= right) {
      arrayOfBars[l].color = secondaryColor;
      await sleep(animationMergeSpeed);
      if (arrayOfBars[l].height < arrayOfBars[m].height) {
        arrayOfBars[l].color = "red";
        temp.push(arrayOfBars[l++].height);
        await sleep(animationMergeSpeed);
      } else {
        arrayOfBars[m].color = "red";
        temp.push(arrayOfBars[m++].height);
      }
      window.requestAnimationFrame(mergeInner);
    }
    while (l <= mid) {
      arrayOfBars[l].color = secondaryColor;
      temp.push(arrayOfBars[l++].height);
      window.cancelAnimationFrame(mergeInner);
    }
    while (m <= right) {
      arrayOfBars[m].color = secondaryColor;
      temp.push(arrayOfBars[m++].height);
      window.cancelAnimationFrame(mergeInner);
    }
  }
  await mergeInner(left, mid, right);
  for (let i = 0; i < temp.length; i++) {
    await sleep(10);
    arrayOfBars[left].color = barColor;
    arrayOfBars[left++].height = temp[i];
  }
}
async function bubbleSort() {
  let size = arrayOfBars.length;
  for (let outer = 0; outer < size; outer++) {
    arrayOfBars[outer].color = tertiaryColor;
    await sleep(animationMergeSpeed);
    for (let inner = 0; inner < size - outer - 1; inner++) {
      arrayOfBars[inner].color = secondaryColor;
      await sleep(animationMergeSpeed);
      if (arrayOfBars[inner + 1].height < arrayOfBars[inner].height) {
        arrayOfBars[inner].color = pivotColor;
        arrayOfBars[inner + 1].color = pivotColor;
        await sleep(1);
        swap(arrayOfBars, inner + 1, inner);
      }
      for (let i = 0; i < arrayOfBars.length; i++) {
        if (i != outer) arrayOfBars[i].color = barColor;
      }
    }
  }
  for (let i = 0; i < arrayOfBars.length; i++) {
    arrayOfBars[i].color = barColor;
  }
}
async function insertionSort() {
  for (let i = 0; i < arrayOfBars.length; i++) {
    await sleep(animationMergeSpeed);
    let key = arrayOfBars[i].height;
    arrayOfBars[i].color = pivotColor;
    let j = i - 1;
    while (j >= 0 && arrayOfBars[j].height > key) {
      arrayOfBars[j].color = tertiaryColor;
      arrayOfBars[j + 1].color = pivotColor;
      await sleep(animationMergeSpeed);
      arrayOfBars[j + 1].height = arrayOfBars[j].height;
      arrayOfBars[j].color = secondaryColor;
      arrayOfBars[j--].color = secondaryColor;
      await sleep(animationMergeSpeed);
    }
    for (let k = 0; k < arrayOfBars.length; k++) {
      arrayOfBars[k].color = barColor;
    }
    arrayOfBars[j + 1].height = key;
  }
}
async function selectionSort() {
  let outer, inner, minimumIndex;
  for (outer = 0; outer < arrayOfBars.length - 1; outer++) {
    minimumIndex = outer;
    arrayOfBars[minimumIndex].color = pivotColor;
    arrayOfBars[outer].color = tertiaryColor;
    await sleep(animationMergeSpeed);
    for (inner = outer + 1; inner < arrayOfBars.length; inner++) {
      arrayOfBars[inner].color = secondaryColor;
      await sleep(3);
      if (arrayOfBars[inner].height < arrayOfBars[minimumIndex].height) {
        minimumIndex = inner;
        for (let k = 0; k < arrayOfBars.length; k++) {
          if (k != outer && k != minimumIndex) {
            arrayOfBars[k].color = barColor;
          }
        }
      }
    }
    swap(arrayOfBars, minimumIndex, outer);
  }
}
async function cocktailSort() {
  let swapped = true;
  let start = 0,
    end = arrayOfBars.length - 1;
  while (swapped) {
    swapped = false;
    await sleep(animationMergeSpeed);
    for (let i = start; i < end; ++i) {
      await sleep(animationMergeSpeed);
      if (arrayOfBars[i].height > arrayOfBars[i + 1].height) {
        swap(arrayOfBars, i, i + 1);
        swapped = true;
      }
    }
    if (!swapped) break;
    for (let i = end - 1; i >= start; --i) {
      await sleep(animationMergeSpeed);
      if (arrayOfBars[i].height > arrayOfBars[i + 1].height) {
        swap(arrayOfBars, i, i + 1);
        swapped = true;
      }
    }
  }
}
async function heapify(array, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && arrayOfBars[l].height > arrayOfBars[largest].height) largest = l;
  if (r < n && arrayOfBars[r].height > arrayOfBars[largest].height) largest = r;
  if (largest != i) {
    await swap(arrayOfBars, i, largest);
    await sleep(animationMergeSpeed);
    await heapify(arrayOfBars, n, largest);
  }
}
async function heapSort() {
  let n = arrayOfBars.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    await heapify(arrayOfBars, n, i);
  for (let i = n - 1; i > 0; i--) {
    await swap(arrayOfBars, 0, i);
    await sleep(animationMergeSpeed);
    await heapify(arrayOfBars, i, 0);
  }
}
//utility funcion to check if the array is in sorted order
function printHeight() {
  for (let i = 0; i < arrayOfBars.length; i++)
    console.log(arrayOfBars[i].height);
}
