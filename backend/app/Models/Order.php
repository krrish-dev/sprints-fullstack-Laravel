<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'orders';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_number',
        'customer_name',
        'customer_email',
        'customer_phone',
        'customer_address',
        'order_status',
        'order_date',
        'order_total',
        'user_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'order_date' => 'datetime',
        'order_total' => 'decimal:2',
    ];

    /**
     * Get the formatted order_total attribute.
     *
     * @param  float  $value
     * @return string
     */
    public function getOrderTotalAttribute($value)
    {
        return number_format($value, 2);
    }

    /**
     * Set the order_total attribute.
     *
     * @param  float  $value
     * @return void
     */
    public function setOrderTotalAttribute($value)
    {
        $this->attributes['order_total'] = number_format($value, 2);
    }

    /**
     * Define a many-to-one relationship with the User model.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

