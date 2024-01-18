using System.Collections;
using System.Linq;
using System;
using UnityEngine;

[System.Serializable]
public class Inventory
{
    public const int MAX_INVENTORY_SIZE = 256;
    [SerializeField]
    private InventorySlot[] Slots;
    public InventorySlot SelectedSlot { get; private set; }
    public IEnumerable Items { get => Slots.Where(x => x.Count > 0 && x.Item != null ); }
    public Action<InventorySlot> SelectedSlotUpdatedDelegate;


    public Inventory()
    {
        Slots = new InventorySlot[MAX_INVENTORY_SIZE];

        for (int i = 0; i < Slots.Length; i++)
        {
            Slots[i] = new InventorySlot(new Item(), 0);
        }
    }

    public void SetSelectedSlot(InventorySlot slot)
    {
        SelectedSlot = slot;
        SelectedSlotUpdatedDelegate?.Invoke(slot);
    }

    public InventorySlot GetSlotInfo(Item item)
    {
        return Slots.FirstOrDefault(x => x.Item.Equals(item));
    }
    
    public InventorySlot GetSlotInfoById(string id)
    {
        return Slots.FirstOrDefault(t => t.Item != null && t.Item.Id.Equals(id));
    }

    public IEnumerable GetItemsWithTags(ItemClass tags)
    {
        return Slots.Where(x => x.Count > 0 && x.Item != null && x.Item.IsTagSelected(tags));
    }

    public bool RemoveItem(Item item, int amount = 1)
    {
        for (int i = 0; i < Slots.Length; i++)
        {
            if (Slots[i].Item != null && Slots[i].Item.Id != null && Slots[i].Count >= amount && Slots[i].Item.Equals(item) )
            {
                Slots[i].Count -= amount;
                if(Slots[i].Count <= 0)
                {
                    Slots[i].Item = new Item();
                }

                return true;
            }
        }
        return false;
    }

    public void AddItem(Item item, int amount = 1)
    {
        int index = IndexOfItemOrFreeSlot(item);
        if(index >= 0)
        {
            if(Slots[index].Count == 0)
            {
                Slots[index].Item = item;
            }
            Slots[index].Count += amount;

            return;
        }

        //TODO: No free space in inventory logic
    }

    private int IndexOfItemOrFreeSlot(Item item)
    {
        for (int i = 0;i < Slots.Length;i++)
        {
            if (Slots[i].Item == null || Slots[i].Count == 0 || Slots[i].Item.Equals(item))
                return i;
        }
        return -1;
    }
}
